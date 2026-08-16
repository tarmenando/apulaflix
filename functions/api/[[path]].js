/**
 * Cloudflare Pages Functions - Universal Serverless Router & Gateway for APULA-FLIX
 * Primary upstream: https://nunodrama.my.id (Injected Bearer Token)
 * Backup upstream:  https://redmi.nunodrama.my.id (Direct Fallback)
 */

const PRIMARY_BASE = "https://nunodrama.my.id";
const BACKUP_BASE  = "https://redmi.nunodrama.my.id";
const API_TOKEN    = "a3VjaW5nIGthbXB1bmc=";

const DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
    "Authorization": `Bearer ${API_TOKEN}`,
    "x-api-token": API_TOKEN,
    "Referer": "https://nunodrama.my.id/"
};

function corsHeaders(custom = {}) {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        ...custom
    };
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: corsHeaders(extraHeaders)
    });
}

export async function onRequest(context) {
    const { request, params } = context;
    const url = new URL(request.url);

    // Handle OPTIONS Preflight globally
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Max-Age": "86400"
            }
        });
    }

    const pathString = Array.isArray(params.path) ? params.path.join("/") : (params.path || "");

    // 1. Route: /api/ping
    if (pathString === "ping") {
        return jsonResponse({ status: "ok", primary: PRIMARY_BASE, backup: BACKUP_BASE, time: Date.now() });
    }

    // 2. Route: /api/proxy_stream - Universal CORS proxy & HLS / HTTPS Rewriter
    if (pathString === "proxy_stream") {
        const streamUrl = url.searchParams.get("url");
        if (!streamUrl) {
            return jsonResponse({ error: "Missing url parameter" }, 400);
        }

        // Whatbox.ca streams require upstream Basic Auth credentials held by redmi.nunodrama.my.id
        if (streamUrl.includes("whatbox.ca")) {
            let authProxyUrl = "";
            if (streamUrl.includes("rambutan")) {
                authProxyUrl = `${BACKUP_BASE}/api/dramaqueen/proxy_video?url=${encodeURIComponent(streamUrl)}`;
            } else {
                authProxyUrl = `${BACKUP_BASE}/api/donghuaqueen/proxy_video?url=${encodeURIComponent(streamUrl)}`;
            }
            return Response.redirect(authProxyUrl, 302);
        }

        const forwardHeaders = new Headers();
        forwardHeaders.set("User-Agent", DEFAULT_HEADERS["User-Agent"]);
        if (request.headers.has("Range")) {
            forwardHeaders.set("Range", request.headers.get("Range"));
        }

        try {
            const mediaResp = await fetch(streamUrl, { headers: forwardHeaders });
            const contentType = mediaResp.headers.get("Content-Type") || "";

            // If it is an HLS .m3u8 playlist, rewrite all relative AND http lines to secure proxy URLs
            if (streamUrl.includes(".m3u8") || contentType.includes("mpegurl") || contentType.includes("application/x-mpegURL")) {
                const m3u8Text = await mediaResp.text();
                const baseUrl = streamUrl.substring(0, streamUrl.lastIndexOf('/') + 1);

                const lines = m3u8Text.split('\n');
                const rewrittenLines = lines.map(line => {
                    const trimmed = line.trim();
                    if (!trimmed) return line;
                    if (trimmed.startsWith('#')) {
                        return trimmed.replace(/URI="([^"]+)"/g, (match, relUri) => {
                            let abs = relUri;
                            if (!relUri.startsWith('http')) {
                                abs = new URL(relUri, baseUrl).href;
                            }
                            return `URI="/api/proxy_stream?url=${encodeURIComponent(abs)}"`;
                        });
                    }
                    let abs = trimmed;
                    if (!trimmed.startsWith('http')) {
                        abs = new URL(trimmed, baseUrl).href;
                    }
                    return `/api/proxy_stream?url=${encodeURIComponent(abs)}`;
                });

                return new Response(rewrittenLines.join('\n'), {
                    status: 200,
                    headers: {
                        "Content-Type": "application/vnd.apple.mpegurl",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                        "Access-Control-Allow-Headers": "*",
                        "Cache-Control": "public, max-age=180"
                    }
                });
            }

            const resHeaders = new Headers(mediaResp.headers);
            resHeaders.set("Access-Control-Allow-Origin", "*");
            resHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
            resHeaders.set("Access-Control-Allow-Headers", "*");

            return new Response(mediaResp.body, {
                status: mediaResp.status,
                statusText: mediaResp.statusText,
                headers: resHeaders
            });
        } catch (e) {
            return jsonResponse({ error: "Proxy failed: " + e.message }, 502);
        }
    }

    // 3. Generic /api/* Proxy with Primary (nunodrama) -> Backup (redmi) Failover
    const primaryTargetUrl = `${PRIMARY_BASE}/api/${pathString}${url.search}`;
    const directHeaders = {
        "User-Agent": DEFAULT_HEADERS["User-Agent"],
        "Accept": "application/json, text/plain, */*",
        "Authorization": `Bearer ${API_TOKEN}`,
        "x-api-token": API_TOKEN,
        "Referer": PRIMARY_BASE + "/"
    };

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        
        const response = await fetch(primaryTargetUrl, {
            method: request.method,
            headers: directHeaders,
            redirect: "follow",
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (response.ok) {
            const responseHeaders = new Headers(response.headers);
            responseHeaders.set("Access-Control-Allow-Origin", "*");
            responseHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
            responseHeaders.set("Access-Control-Allow-Headers", "*");

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders
            });
        }
    } catch (err) {}

    // Fallback to Backup Server
    const backupTargetUrl = `${BACKUP_BASE}/api/${pathString}${url.search}`;
    try {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 4000);

        const backupResp = await fetch(backupTargetUrl, {
            method: request.method,
            headers: {
                "User-Agent": DEFAULT_HEADERS["User-Agent"],
                "Accept": "application/json, text/plain, */*",
                "Referer": BACKUP_BASE + "/"
            },
            redirect: "follow",
            signal: controller2.signal
        });
        clearTimeout(timeout2);

        const bHeaders = new Headers(backupResp.headers);
        bHeaders.set("Access-Control-Allow-Origin", "*");
        bHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
        bHeaders.set("Access-Control-Allow-Headers", "*");

        return new Response(backupResp.body, {
            status: backupResp.status,
            statusText: backupResp.statusText,
            headers: bHeaders
        });
    } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 502);
    }
}

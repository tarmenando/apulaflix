/**
 * Cloudflare Pages Functions - Universal Serverless Router & Gateway for APULA-FLIX
 */

const UPSTREAM_BASE = "https://redmi.nunodrama.my.id";
const DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
    "Referer": "https://redmi.nunodrama.my.id/"
};

const PLATFORMS_CONFIG = [
    {
        id: "sodareels",
        name: "SodaReels",
        badge: "250+ Drama HD",
        icon: "🥤",
        endpoints: {
            foryou: "/api/sodareels/foryou",
            trending: "/api/sodareels/foryou",
            search: "/api/sodareels/search",
            detail: "/api/sodareels/detail",
            allepisode: "/api/sodareels/allepisode",
            stream: "/api/sodareels/stream"
        }
    },
    {
        id: "dramawave",
        name: "DramaWave",
        badge: "Popular (HLS)",
        icon: "🌊",
        endpoints: {
            foryou: "/api/dramawave/trending",
            trending: "/api/dramawave/trending",
            new: "/api/dramawave/newrelease",
            vip: "/api/dramawave/vip",
            search: "/api/dramawave/search",
            detail: "/api/dramawave/detail",
            allepisode: "/api/dramawave/allepisode",
            stream: "/api/dramawave/stream"
        }
    },
    {
        id: "dramabox",
        name: "DramaBox",
        badge: "Short Drama",
        icon: "🎭",
        endpoints: {
            foryou: "/api/dramabox/dubbing",
            trending: "/api/dramabox/ranking",
            terbaru: "/api/dramabox/terbaru",
            dubbing: "/api/dramabox/dubbing",
            vip: "/api/dramabox/vip",
            search: "/api/dramabox/search",
            detail: "/api/dramabox/detail",
            allepisode: "/api/dramabox/allepisode",
            stream: "/api/dramabox/stream"
        }
    },
    {
        id: "lookseries",
        name: "LookSeries",
        badge: "Film & Series",
        icon: "🎬",
        endpoints: {
            foryou: "/api/lookseries/foryou",
            trending: "/api/lookseries/foryou",
            film: "/api/lookseries/film",
            series: "/api/lookseries/series",
            kartun: "/api/lookseries/kartun",
            search: "/api/lookseries/search",
            detail: "/api/lookseries/detail",
            allepisode: "/api/lookseries/allepisode",
            stream: "/api/lookseries/stream"
        }
    },
    {
        id: "donghuaqueen",
        name: "DonghuaQueen",
        badge: "Donghua / Anime",
        icon: "🐉",
        endpoints: {
            foryou: "/api/donghuaqueen/donghua",
            trending: "/api/donghuaqueen/donghua",
            donghua: "/api/donghuaqueen/donghua",
            search: "/api/donghuaqueen/search",
            detail: "/api/donghuaqueen/detail",
            allepisode: "/api/donghuaqueen/allepisode",
            stream: "/api/donghuaqueen/stream"
        }
    },
    {
        id: "dramaqueen",
        name: "DramaQueen",
        badge: "Drakor / Series",
        icon: "👑",
        endpoints: {
            foryou: "/api/dramaqueen/drama",
            trending: "/api/dramaqueen/drama",
            movie: "/api/dramaqueen/movie",
            search: "/api/dramaqueen/search",
            detail: "/api/dramaqueen/detail",
            allepisode: "/api/dramaqueen/allepisode",
            stream: "/api/dramaqueen/stream"
        }
    },
    {
        id: "mydrama",
        name: "MyDrama",
        badge: "Romance (HLS)",
        icon: "💖",
        endpoints: {
            foryou: "/api/mydrama/foryou",
            trending: "/api/mydrama/foryou",
            search: "/api/mydrama/search",
            detail: "/api/mydrama/detail",
            allepisode: "/api/mydrama/allepisode",
            stream: "/api/mydrama/stream"
        }
    },
    {
        id: "minishort",
        name: "MiniShort",
        badge: "Mini Series (HLS)",
        icon: "📺",
        endpoints: {
            foryou: "/api/minishort/foryou",
            trending: "/api/minishort/foryou",
            search: "/api/minishort/search",
            detail: "/api/minishort/detail",
            allepisode: "/api/minishort/allepisode",
            stream: "/api/minishort/stream"
        }
    },
    {
        id: "goodshort",
        name: "GoodShort",
        badge: "Top Picks",
        icon: "⭐",
        endpoints: {
            foryou: "/api/goodshort/foryou",
            trending: "/api/goodshort/foryou",
            search: "/api/goodshort/search",
            detail: "/api/goodshort/detail",
            allepisode: "/api/goodshort/allepisode",
            stream: "/api/goodshort/stream"
        }
    },
    {
        id: "shorten",
        name: "ShortEn",
        badge: "Viral Shorts",
        icon: "🔥",
        endpoints: {
            foryou: "/api/shorten/foryou",
            trending: "/api/shorten/trending",
            search: "/api/shorten/search",
            detail: "/api/shorten/detail",
            allepisode: "/api/shorten/allepisode",
            stream: "/api/shorten/stream"
        }
    },
    {
        id: "vigloo",
        name: "Vigloo",
        badge: "Exclusive",
        icon: "💎",
        endpoints: {
            foryou: "/api/vigloo/foryou",
            trending: "/api/vigloo/foryou",
            detail: "/api/vigloo/detail",
            allepisode: "/api/vigloo/allepisode",
            stream: "/api/vigloo/stream"
        }
    },
    {
        id: "honey",
        name: "Honey Drama",
        badge: "Popular",
        icon: "🍯",
        endpoints: {
            foryou: "/api/honey/foryou",
            trending: "/api/honey/foryou",
            recommend: "/api/honey/recommend",
            search: "/api/honey/search",
            detail: "/api/honey/detail",
            allepisode: "/api/honey/allepisode",
            stream: "/api/honey/stream"
        }
    },
    {
        id: "dotdrama",
        name: "DotDrama",
        badge: "HD Series",
        icon: "✨",
        endpoints: {
            foryou: "/api/dotdrama/foryou",
            trending: "/api/dotdrama/foryou",
            search: "/api/dotdrama/search",
            detail: "/api/dotdrama/detail",
            allepisode: "/api/dotdrama/allepisode",
            stream: "/api/dotdrama/stream"
        }
    },
    {
        id: "soreel",
        name: "SoReel",
        badge: "Short Romance",
        icon: "🌹",
        endpoints: {
            foryou: "/api/soreel/foryou",
            trending: "/api/soreel/ranking",
            search: "/api/soreel/search",
            detail: "/api/soreel/detail",
            allepisode: "/api/soreel/allepisode",
            stream: "/api/soreel/stream"
        }
    },
    {
        id: "fundrama",
        name: "FunDrama",
        badge: "Comedy & Action",
        icon: "🎉",
        endpoints: {
            foryou: "/api/fundrama/foryou",
            trending: "/api/fundrama/foryou",
            search: "/api/fundrama/search",
            detail: "/api/fundrama/detail",
            allepisode: "/api/fundrama/allepisode",
            stream: "/api/fundrama/stream"
        }
    },
    {
        id: "bibishort",
        name: "BibiShort",
        badge: "Mini Series",
        icon: "📱",
        endpoints: {
            foryou: "/api/bibishort/foryou",
            trending: "/api/bibishort/foryou",
            home: "/api/bibishort/home",
            search: "/api/bibishort/search",
            detail: "/api/bibishort/detail",
            allepisode: "/api/bibishort/allepisode",
            stream: "/api/bibishort/stream"
        }
    }
];

const PLATFORM_MAP = Object.fromEntries(PLATFORMS_CONFIG.map(p => [p.id, p]));

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

async function fetchUpstream(endpoint, params = {}) {
    const q = new URLSearchParams(params).toString();
    const url = `${UPSTREAM_BASE}${endpoint}${q ? '?' + q : ''}`;
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6500);
        
        const resp = await fetch(url, {
            headers: DEFAULT_HEADERS,
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (resp.ok) {
            return await resp.json();
        }
    } catch (e) {}
    return null;
}

function extractList(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "object") {
        if (data.data && typeof data.data === "object") {
            if (Array.isArray(data.data)) return data.data;
            if (Array.isArray(data.data.episodes)) return data.data.episodes;
            if (Array.isArray(data.data.list)) return data.data.list;
            if (Array.isArray(data.data.items)) return data.data.items;
        }
        for (const key of ["books", "data", "list", "items", "dramas", "results", "dataList", "programList", "vod_list", "episodes", "chapterList"]) {
            if (Array.isArray(data[key]) && data[key].length > 0) {
                return data[key];
            } else if (data[key] && typeof data[key] === "object" && Array.isArray(data[key].list)) {
                return data[key].list;
            } else if (data[key] && typeof data[key] === "object" && Array.isArray(data[key].episodes)) {
                return data[key].episodes;
            }
        }
    }
    return [];
}

function normalizeCard(item, platformId) {
    const pInfo = PLATFORM_MAP[platformId] || { name: platformId.toUpperCase(), badge: "HD" };
    
    const dramaId = String(
        item.bookId || item.book_id || item.id || item.vid ||
        item.vod_id || item.drama_id || item.dramaId || item.subject_id || item.movieId || ""
    );
    
    const title = (
        item.bookName || item.title || item.name ||
        item.drama_name || item.vod_name || item.video_name ||
        item.dramaName || "Untitled Drama"
    );
    
    let cover = (
        item.cover || item.cover_url || item.image || item.thumb ||
        item.poster || item.img || item.img_landscape_url || item.vod_pic ||
        item.horizontal_cover || item.vertical_cover || ""
    );
    if (cover && cover.startsWith('http://')) {
        cover = cover.replace('http://', 'https://');
    }
    
    const desc = (
        item.description || item.synopsis || item.intro ||
        item.summary || item.brief || ""
    );
    
    const episodes = (
        item.chapterCount || item.total_episode || item.jumlah_episode || item.episode_final ||
        item.num_videos || item.episodes_count || item.total_chapter || item.episode_num || item.total || null
    );
    
    let tags = item.tagList || item.genres || item.genre || item.labels || item.tags || item.categories || item.category || [];
    if (typeof tags === "string") {
        try {
            const parsed = JSON.parse(tags);
            if (Array.isArray(parsed)) tags = parsed;
            else tags = tags.split(",").map(t => t.trim()).filter(Boolean);
        } catch (e) {
            tags = tags.split(",").map(t => t.trim()).filter(Boolean);
        }
    } else if (Array.isArray(tags)) {
        tags = tags.map(t => typeof t === "object" ? (t.name || String(t)) : String(t));
    }

    const rating = item.score || item.rating || "9.8";
    
    return {
        id: dramaId,
        title: title,
        cover: cover,
        description: desc,
        episodes: episodes,
        tags: tags.slice(0, 3),
        rating: rating,
        platform_id: platformId,
        platform_name: pInfo.name || platformId,
        badge: pInfo.badge || "HD"
    };
}

export async function onRequest(context) {
    const { request, params } = context;
    const url = new URL(request.url);

    // Handle OPTIONS Preflight
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

    // 1. Route: /api/platforms
    if (pathString === "platforms") {
        return jsonResponse({
            success: true,
            platforms: PLATFORMS_CONFIG.map(p => ({
                id: p.id,
                name: p.name,
                badge: p.badge,
                icon: p.icon
            }))
        }, 200, { "Cache-Control": "public, max-age=1800" });
    }

    // 2. Route: /api/ping
    if (pathString === "ping") {
        return jsonResponse({ status: "ok", time: Date.now() });
    }

    // 3. Route: /api/browse
    if (pathString === "browse") {
        const platform = url.searchParams.get("platform") || "all";
        const category = url.searchParams.get("category") || "foryou";
        const page = parseInt(url.searchParams.get("page") || "1");

        let targetPlatforms = [];
        if (platform !== "all" && PLATFORM_MAP[platform]) {
            targetPlatforms = [platform];
        } else {
            targetPlatforms = ["sodareels", "dramawave", "dramabox", "lookseries", "donghuaqueen", "dramaqueen", "mydrama", "minishort", "goodshort", "shorten", "vigloo", "honey", "dotdrama", "soreel", "fundrama", "bibishort"];
        }

        const promises = targetPlatforms.map(async (pId) => {
            const pCfg = PLATFORM_MAP[pId];
            if (!pCfg) return [];
            const eps = pCfg.endpoints || {};
            const ep = eps[category] || eps.foryou || Object.values(eps)[0];
            if (!ep) return [];

            const pParams = { page };
            if (ep.includes("limit") || ep.includes("drama") || ep.includes("donghua")) {
                pParams.limit = 18;
            }

            const data = await fetchUpstream(ep, pParams);
            const rawItems = extractList(data);
            return rawItems.map(item => normalizeCard(item, pId));
        });

        const settled = await Promise.allSettled(promises);
        const results = [];
        for (const res of settled) {
            if (res.status === "fulfilled" && Array.isArray(res.value)) {
                results.push(...res.value);
            }
        }

        return jsonResponse({
            success: true,
            page,
            category,
            platform,
            count: results.length,
            data: results
        }, 200, { "Cache-Control": "public, max-age=300" });
    }

    // 4. Route: /api/proxy_stream - Universal CORS proxy & HLS rewriter
    if (pathString === "proxy_stream") {
        const streamUrl = url.searchParams.get("url");
        if (!streamUrl) {
            return jsonResponse({ error: "Missing url parameter" }, 400);
        }

        const forwardHeaders = new Headers();
        forwardHeaders.set("User-Agent", DEFAULT_HEADERS["User-Agent"]);
        if (request.headers.has("Range")) {
            forwardHeaders.set("Range", request.headers.get("Range"));
        }

        try {
            const mediaResp = await fetch(streamUrl, { headers: forwardHeaders });
            const contentType = mediaResp.headers.get("Content-Type") || "";

            // If it is an HLS .m3u8 playlist, rewrite relative URLs to absolute proxy URLs
            if (streamUrl.includes(".m3u8") || contentType.includes("mpegurl") || contentType.includes("application/x-mpegURL")) {
                const m3u8Text = await mediaResp.text();
                const baseUrl = streamUrl.substring(0, streamUrl.lastIndexOf('/') + 1);

                const lines = m3u8Text.split('\n');
                const rewrittenLines = lines.map(line => {
                    const trimmed = line.trim();
                    if (!trimmed) return line;
                    if (trimmed.startsWith('#')) {
                        return trimmed.replace(/URI="([^"]+)"/g, (match, relUri) => {
                            if (!relUri.startsWith('http')) {
                                const abs = new URL(relUri, baseUrl).href;
                                return `URI="/api/proxy_stream?url=${encodeURIComponent(abs)}"`;
                            }
                            return match;
                        });
                    }
                    if (!trimmed.startsWith('http')) {
                        const abs = new URL(trimmed, baseUrl).href;
                        return `/api/proxy_stream?url=${encodeURIComponent(abs)}`;
                    }
                    return line;
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

    // 5. Fallback: Direct proxy for any other API route
    const targetUrl = `${UPSTREAM_BASE}/api/${pathString}${url.search}`;
    const directHeaders = new Headers(request.headers);
    directHeaders.set("User-Agent", DEFAULT_HEADERS["User-Agent"]);
    directHeaders.set("Referer", UPSTREAM_BASE + "/");
    directHeaders.delete("host");

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: directHeaders,
            redirect: "follow"
        });

        const responseHeaders = new Headers(response.headers);
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
        responseHeaders.set("Access-Control-Allow-Headers", "*");

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });
    } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 502);
    }
}

/**
 * Cloudflare Pages Functions - Universal API Proxy & CORS Handler for APULA-FLIX
 */

export async function onRequest(context) {
    const { request, params } = context;
    const url = new URL(request.url);

    // Ambil path yang dipanggil setelah /api/
    const apiPath = Array.isArray(params.path) ? params.path.join('/') : params.path;
    const targetUrl = `https://redmi.nunodrama.my.id/api/${apiPath}${url.search}`;

    // Handle Preflight OPTIONS request
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '86400',
            }
        });
    }

    // Set User-Agent & Headers agar tidak diblokir oleh upstream
    const forwardHeaders = new Headers();
    forwardHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
    forwardHeaders.set('Accept', 'application/json, text/plain, */*');
    forwardHeaders.set('Accept-Language', 'en-US,en;q=0.9,id;q=0.8');
    forwardHeaders.set('Referer', 'https://redmi.nunodrama.my.id/');

    // Pass Range header for video chunk streaming if present
    if (request.headers.has('Range')) {
        forwardHeaders.set('Range', request.headers.get('Range'));
    }

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: forwardHeaders,
            redirect: 'follow'
        });

        const resHeaders = new Headers(response.headers);
        resHeaders.set('Access-Control-Allow-Origin', '*');
        resHeaders.set('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
        resHeaders.set('Access-Control-Allow-Headers', '*');
        
        // Cache API responses at Cloudflare Edge for 10 minutes to make browsing super fast
        if (response.status === 200 && !apiPath.includes('stream')) {
            resHeaders.set('Cache-Control', 'public, max-age=600, s-maxage=600');
        }

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: resHeaders
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 502,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

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
        id: "netshort",
        name: "NetShort",
        badge: "Sulih Suara",
        icon: "⚡",
        endpoints: {
            foryou: "/api/netshort/foryou",
            trending: "/api/netshort/foryou",
            search: "/api/netshort/search",
            detail: "/api/netshort/detail",
            allepisode: "/api/netshort/allepisode",
            stream: "/api/netshort/stream"
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
    
    const cover = (
        item.cover || item.cover_url || item.image || item.thumb ||
        item.poster || item.img || item.img_landscape_url || item.vod_pic ||
        item.horizontal_cover || item.vertical_cover || ""
    );
    
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
            targetPlatforms = ["dramawave", "dramabox", "lookseries", "donghuaqueen", "dramaqueen", "goodshort", "vigloo", "honey", "fundrama", "bibishort"];
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

    // 4. Route: /api/search
    if (pathString === "search") {
        const keyword = url.searchParams.get("keyword") || "";
        const platform = url.searchParams.get("platform") || "all";
        if (!keyword) {
            return jsonResponse({ success: true, count: 0, data: [] });
        }

        let targetPlatforms = [];
        if (platform !== "all" && PLATFORM_MAP[platform]) {
            targetPlatforms = [platform];
        } else {
            targetPlatforms = ["dramawave", "dramabox", "lookseries", "donghuaqueen", "dramaqueen", "goodshort", "honey", "fundrama"];
        }

        const promises = targetPlatforms.map(async (pId) => {
            const pCfg = PLATFORM_MAP[pId];
            if (!pCfg || !pCfg.endpoints || !pCfg.endpoints.search) return [];
            const data = await fetchUpstream(pCfg.endpoints.search, { keyword, page: 1 });
            const rawItems = extractList(data);
            return rawItems.map(item => normalizeCard(item, pId));
        });

        const settled = await Promise.allSettled(promises);
        const allCards = [];
        for (const res of settled) {
            if (res.status === "fulfilled" && Array.isArray(res.value)) {
                allCards.push(...res.value);
            }
        }

        return jsonResponse({
            success: true,
            keyword,
            count: allCards.length,
            data: allCards
        });
    }

    // 5. Route: /api/detail
    if (pathString === "detail") {
        const platform = url.searchParams.get("platform");
        const id = url.searchParams.get("id");
        if (!platform || !id || !PLATFORM_MAP[platform]) {
            return jsonResponse({ success: false, message: "Invalid platform or id" }, 400);
        }

        const pCfg = PLATFORM_MAP[platform];
        const detailEp = pCfg.endpoints.detail;
        const allepEp = pCfg.endpoints.allepisode;

        let paramKey = "book_id";
        if (platform === "lookseries") paramKey = "vod_id";
        else if (platform === "vigloo") paramKey = "video_id";

        const [detailData, epData] = await Promise.all([
            detailEp ? fetchUpstream(detailEp, { [paramKey]: id }) : null,
            allepEp ? fetchUpstream(allepEp, { [paramKey]: id }) : null
        ]);

        let rawEpisodes = extractList(epData) || extractList(detailData);
        const episodes = [];
        if (Array.isArray(rawEpisodes) && rawEpisodes.length > 0) {
            rawEpisodes.forEach((ep, idx) => {
                const epNum = ep.chapterIndex || ep.number_episode || ep.episode || ep.episode_num || ep.index || (idx + 1);
                const epId = String(ep.chapterId || ep.chapter_id || ep.episode_id || ep.id || ep.eid || ep.nid || epNum);
                const epTitle = ep.chapterName || ep.title || ep.name || `Episode ${epNum}`;
                const directUrl = ep.link_720 || ep.link720_pro || ep.link720_a || ep.video_url || null;
                episodes.push({
                    episode_num: epNum,
                    episode_id: epId,
                    title: epTitle,
                    direct_url: directUrl
                });
            });
        }

        if (episodes.length === 0) {
            for (let i = 1; i <= 30; i++) {
                episodes.push({
                    episode_num: i,
                    episode_id: String(i),
                    title: `Episode ${i}`,
                    direct_url: null
                });
            }
        }

        const card = normalizeCard((detailData && detailData.data) || detailData || {}, platform);
        if (!card.id) card.id = id;

        return jsonResponse({
            success: true,
            drama: card,
            episodes
        });
    }

    // 6. Route: /api/stream
    if (pathString === "stream") {
        const platform = url.searchParams.get("platform");
        const id = url.searchParams.get("id");
        const episode = parseInt(url.searchParams.get("episode") || "1");
        const episodeId = url.searchParams.get("episode_id");

        if (!platform || !id || !PLATFORM_MAP[platform]) {
            return jsonResponse({ success: false, message: "Invalid platform or id" }, 400);
        }

        const pCfg = PLATFORM_MAP[platform];
        const streamEp = pCfg.endpoints.stream;
        if (!streamEp) {
            return jsonResponse({ success: false, message: "No stream endpoint" }, 404);
        }

        let sParams = {};
        if (platform === "dramabox") {
            sParams = { book_id: id, episode_num: episode };
        } else if (platform === "dramawave") {
            sParams = { book_id: id, chapter_id: episodeId || String(episode) };
        } else if (platform === "lookseries") {
            sParams = { vod_id: id, episode };
        } else if (platform === "vigloo") {
            sParams = { season_id: id, episode_num: episode };
        } else if (platform === "honey") {
            sParams = { book_id: id, chapter_id: episodeId || String(episode) };
        } else if (platform === "goodshort") {
            sParams = { book_id: id, episode_index: episode, episode_id: episodeId || String(episode) };
        } else if (["dramaqueen", "donghuaqueen", "fundrama"].includes(platform)) {
            sParams = { book_id: id, episode };
        } else {
            sParams = { book_id: id, episode };
        }

        const streamData = await fetchUpstream(streamEp, sParams);
        if (!streamData) {
            return jsonResponse({ success: false, message: "Failed to fetch stream from source" }, 502);
        }

        let videoUrl = null;
        let streamType = "mp4";
        let subtitles = [];

        if (typeof streamData === "object" && streamData !== null) {
            const d = streamData.data || streamData;
            videoUrl = (
                d.playUrl || d.url || d.videoUrl ||
                d.stream_url || d.video_url || d.m3u8 ||
                d.video_url_raw || d.link_720 || d.link720_pro ||
                d.encryptUrl || d.play_url || d.proxyUrl
            );
            if (!videoUrl && Array.isArray(d.sources) && d.sources.length > 0) {
                videoUrl = d.sources[0].url;
            }
            if (!videoUrl && Array.isArray(d.qualities) && d.qualities.length > 0) {
                videoUrl = d.qualities[0].url;
            }
            if (Array.isArray(d.subtitles)) {
                subtitles = d.subtitles;
            }
        } else if (typeof streamData === "string" && streamData.startsWith("http")) {
            videoUrl = streamData;
        }

        if (!videoUrl) {
            return jsonResponse({
                success: false,
                raw: streamData,
                message: "Stream URL not available"
            });
        }

        if (videoUrl.includes(".m3u8")) {
            streamType = "hls";
        }

        return jsonResponse({
            success: true,
            video_url: videoUrl,
            stream_type: streamType,
            subtitles,
            platform,
            id,
            episode
        });
    }

    // 7. Route: /api/proxy_stream
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
            const mediaResp = await fetch(streamUrl, {
                headers: forwardHeaders
            });

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

    // 8. Fallback: Direct proxy for any other API route
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

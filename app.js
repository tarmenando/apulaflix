/**
 * APULA-FLIX - HIGH PERFORMANCE CLIENT-SIDE STREAMING CONTROLLER
 */

const API_BASE = "https://redmi.nunodrama.my.id";

const DEFAULT_POSTER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23222222"/><stop offset="100%" stop-color="%23111111"/></linearGradient></defs><rect width="300" height="450" fill="url(%23g)"/><rect x="6" y="6" width="288" height="438" rx="6" fill="none" stroke="%23333333" stroke-width="2"/><circle cx="150" cy="180" r="36" fill="%23E50914" opacity="0.85"/><polygon points="144,166 164,180 144,194" fill="%23ffffff"/><text x="150" y="250" fill="%23ffffff" font-family="-apple-system,sans-serif" font-size="15" font-weight="bold" text-anchor="middle">APULA-FLIX</text><text x="150" y="275" fill="%23888888" font-family="-apple-system,sans-serif" font-size="12" text-anchor="middle">Streaming</text></svg>`;

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

const STATE = {
    currentPlatform: 'all',
    currentCategory: 'foryou',
    currentSearch: '',
    platforms: PLATFORMS_CONFIG,
    dramas: [],
    featuredDrama: null,
    activeDrama: null,
    activeEpisodeNum: 1,
    activeEpisodesList: [],
    hlsInstance: null
};

// DOM Elements
const elements = {
    navbar: document.getElementById('navbar'),
    platformDropdownBtn: document.getElementById('platformDropdownBtn'),
    platformDropdown: document.getElementById('platformDropdown'),
    platformList: document.getElementById('platformList'),
    platformBadgeCount: document.getElementById('platformBadgeCount'),
    currentPlatformIcon: document.getElementById('currentPlatformIcon'),
    currentPlatformName: document.getElementById('currentPlatformName'),
    filterPillsBar: document.getElementById('filterPillsBar'),
    mobileCategoryBar: document.getElementById('mobileCategoryBar'),
    mobileBottomNav: document.getElementById('mobileBottomNav'),
    navTabs: document.querySelectorAll('.nav-tab'),
    searchBox: document.getElementById('searchBox'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    searchToggle: document.getElementById('searchToggle'),
    dramaGrid: document.getElementById('dramaGrid'),
    sectionTitle: document.getElementById('currentSectionTitle'),
    sectionCount: document.getElementById('sectionCount'),
    
    // Hero
    heroBanner: document.getElementById('heroBanner'),
    heroBackdrop: document.getElementById('heroBackdrop'),
    heroTitle: document.getElementById('heroTitle'),
    heroPlatform: document.getElementById('heroPlatform'),
    heroRating: document.getElementById('heroRating'),
    heroEpisodes: document.getElementById('heroEpisodes'),
    heroTags: document.getElementById('heroTags'),
    heroSynopsis: document.getElementById('heroSynopsis'),
    heroPlayBtn: document.getElementById('heroPlayBtn'),
    heroInfoBtn: document.getElementById('heroInfoBtn'),
    
    // Player Modal
    playerModal: document.getElementById('playerModal'),
    closePlayerBtn: document.getElementById('closePlayerBtn'),
    closePlayerBackdrop: document.getElementById('closePlayerBackdrop'),
    playerDramaTitle: document.getElementById('playerDramaTitle'),
    playerEpisodeTitle: document.getElementById('playerEpisodeTitle'),
    playerPlatformBadge: document.getElementById('playerPlatformBadge'),
    playerSynopsis: document.getElementById('playerSynopsis'),
    mainVideo: document.getElementById('mainVideo'),
    videoLoading: document.getElementById('videoLoading'),
    videoLoadingText: document.getElementById('videoLoadingText'),
    episodeList: document.getElementById('episodeList'),
    sidebarEpCount: document.getElementById('sidebarEpCount'),
    epSearchInput: document.getElementById('epSearchInput'),
    prevEpBtn: document.getElementById('prevEpBtn'),
    nextEpBtn: document.getElementById('nextEpBtn'),
    reloadProxyBtn: document.getElementById('reloadProxyBtn'),
    
    toast: document.getElementById('toast')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderPlatformDropdown(PLATFORMS_CONFIG);
    renderPlatformPills(PLATFORMS_CONFIG);
    loadDramas();
});

function initEvents() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    elements.platformDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.platformDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        elements.platformDropdown.classList.remove('show');
    });

    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setCategory(tab.dataset.category);
        });
    });

    if (elements.mobileCategoryBar) {
        elements.mobileCategoryBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.cat-pill');
            if (btn) {
                setCategory(btn.dataset.category);
            }
        });
    }

    elements.filterPillsBar.addEventListener('click', (e) => {
        const pill = e.target.closest('.pill');
        if (!pill) return;
        setPlatform(pill.dataset.platform);
    });

    if (elements.mobileBottomNav) {
        elements.mobileBottomNav.addEventListener('click', (e) => {
            const btn = e.target.closest('.bottom-nav-item');
            if (!btn) return;
            
            document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const action = btn.dataset.action;
            if (action === 'home') {
                setCategory('foryou');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (action === 'trending') {
                setCategory('trending');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (action === 'platforms') {
                elements.platformDropdown.classList.toggle('show');
            } else if (action === 'search') {
                elements.searchInput.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        elements.searchBox.classList.toggle('has-text', q.length > 0);
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (q.length > 0) {
                STATE.currentSearch = q;
                performSearch(q);
            } else {
                STATE.currentSearch = '';
                loadDramas();
            }
        }, 350);
    });

    if (elements.searchClearBtn) {
        elements.searchClearBtn.addEventListener('click', () => {
            elements.searchInput.value = '';
            elements.searchBox.classList.remove('has-text');
            STATE.currentSearch = '';
            loadDramas();
        });
    }

    elements.heroPlayBtn.addEventListener('click', () => {
        if (STATE.featuredDrama) {
            openPlayer(STATE.featuredDrama, 1);
        }
    });

    elements.heroInfoBtn.addEventListener('click', () => {
        if (STATE.featuredDrama) {
            openPlayer(STATE.featuredDrama, 1);
        }
    });

    elements.closePlayerBtn.addEventListener('click', closePlayer);
    elements.closePlayerBackdrop.addEventListener('click', closePlayer);

    elements.epSearchInput.addEventListener('input', (e) => {
        const filterVal = e.target.value.trim().toLowerCase();
        const epButtons = elements.episodeList.querySelectorAll('.ep-btn');
        epButtons.forEach(btn => {
            const txt = btn.textContent.toLowerCase();
            btn.style.display = txt.includes(filterVal) ? 'block' : 'none';
        });
    });

    elements.prevEpBtn.addEventListener('click', () => {
        if (STATE.activeEpisodeNum > 1) {
            playEpisode(STATE.activeEpisodeNum - 1);
        }
    });

    elements.nextEpBtn.addEventListener('click', () => {
        if (STATE.activeEpisodeNum < STATE.activeEpisodesList.length) {
            playEpisode(STATE.activeEpisodeNum + 1);
        } else {
            showToast('Sudah episode terakhir.');
        }
    });

    elements.mainVideo.addEventListener('ended', () => {
        if (STATE.activeEpisodeNum < STATE.activeEpisodesList.length) {
            showToast(`Memutar Episode ${STATE.activeEpisodeNum + 1}...`);
            playEpisode(STATE.activeEpisodeNum + 1);
        }
    });

    elements.reloadProxyBtn.addEventListener('click', () => {
        if (STATE.activeDrama) {
            playEpisode(STATE.activeEpisodeNum, true);
        }
    });
}

function setCategory(category) {
    STATE.currentCategory = category;
    STATE.currentSearch = '';
    elements.searchInput.value = '';
    elements.searchBox.classList.remove('has-text');

    elements.navTabs.forEach(t => {
        t.classList.toggle('active', t.dataset.category === category);
    });

    if (elements.mobileCategoryBar) {
        elements.mobileCategoryBar.querySelectorAll('.cat-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.category === category);
        });
    }

    updateSectionTitle();
    loadDramas();
}

function renderPlatformDropdown(platforms) {
    let html = `
        <div class="platform-item ${STATE.currentPlatform === 'all' ? 'active' : ''}" data-id="all">
            <div class="platform-item-left">
                <span>🌐</span>
                <span>Semua Platform</span>
            </div>
            <span class="platform-badge-tag">Multi</span>
        </div>
    `;

    platforms.forEach(p => {
        html += `
            <div class="platform-item ${STATE.currentPlatform === p.id ? 'active' : ''}" data-id="${p.id}">
                <div class="platform-item-left">
                    <span>${p.icon}</span>
                    <span>${p.name}</span>
                </div>
                <span class="platform-badge-tag">${p.badge}</span>
            </div>
        `;
    });

    elements.platformList.innerHTML = html;
    if (elements.platformBadgeCount) {
        elements.platformBadgeCount.textContent = `${platforms.length} Aktif`;
    }

    elements.platformList.querySelectorAll('.platform-item').forEach(item => {
        item.addEventListener('click', () => {
            const pId = item.dataset.id;
            setPlatform(pId);
        });
    });
}

function renderPlatformPills(platforms) {
    let html = `<button class="pill ${STATE.currentPlatform === 'all' ? 'active' : ''}" data-platform="all">🌐 Semua</button>`;
    platforms.forEach(p => {
        html += `<button class="pill ${STATE.currentPlatform === p.id ? 'active' : ''}" data-platform="${p.id}">${p.icon} ${p.name}</button>`;
    });
    elements.filterPillsBar.innerHTML = html;
}

function setPlatform(platformId) {
    STATE.currentPlatform = platformId;
    
    const selected = STATE.platforms.find(p => p.id === platformId);
    if (selected) {
        elements.currentPlatformIcon.textContent = selected.icon;
        elements.currentPlatformName.textContent = selected.name;
    } else {
        elements.currentPlatformIcon.textContent = '🌐';
        elements.currentPlatformName.textContent = 'Semua Platform';
    }

    elements.platformList.querySelectorAll('.platform-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === platformId);
    });

    elements.filterPillsBar.querySelectorAll('.pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.platform === platformId);
    });

    updateSectionTitle();
    loadDramas();
}

function updateSectionTitle() {
    const catMap = {
        'foryou': 'Sedang Tren & Pilihan Untuk Anda',
        'trending': 'Daftar Drama Terpopuler',
        'terbaru': 'Rilis Terbaru Hari Ini',
        'dubbing': 'Drama Sulih Suara Bahasa Indonesia',
        'vip': 'Koleksi Drama VIP Eksklusif',
        'movie': 'Film & Serial Panjang',
        'donghua': 'Serial Donghua & Animasi'
    };

    let title = catMap[STATE.currentCategory] || 'Katalog Drama';
    if (STATE.currentPlatform !== 'all') {
        const p = STATE.platforms.find(x => x.id === STATE.currentPlatform);
        title += ` (${p ? p.name : STATE.currentPlatform.toUpperCase()})`;
    }
    elements.sectionTitle.textContent = title;
}

// Data Normalization & Extraction
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

async function apiFetch(endpoint, params = {}) {
    const q = new URLSearchParams(params).toString();
    const url = `${API_BASE}${endpoint}${q ? '?' + q : ''}`;
    try {
        const resp = await fetch(url, { mode: 'cors' });
        if (resp.ok) {
            return await resp.json();
        }
    } catch (e) {
        console.warn(`Direct fetch failed for ${endpoint}, trying local fallback:`, e);
        try {
            const proxyResp = await fetch(endpoint + (q ? '?' + q : ''));
            if (proxyResp.ok) return await proxyResp.json();
        } catch (err) {}
    }
    return null;
}

// Fetch and Render Drama Catalog
async function loadDramas() {
    elements.dramaGrid.innerHTML = `
        <div class="grid-loading">
            <div class="spinner"></div>
            <p>Memuat tayangan terbaik...</p>
        </div>
    `;

    let targetPlatforms = [];
    if (STATE.currentPlatform !== 'all' && PLATFORM_MAP[STATE.currentPlatform]) {
        targetPlatforms = [STATE.currentPlatform];
    } else {
        targetPlatforms = ["sodareels", "dramawave", "dramabox", "lookseries", "donghuaqueen", "dramaqueen", "mydrama", "minishort", "goodshort", "shorten", "vigloo", "honey", "dotdrama", "soreel", "fundrama", "bibishort"];
    }

    try {
        const promises = targetPlatforms.map(async (pId) => {
            const pCfg = PLATFORM_MAP[pId];
            if (!pCfg) return [];
            const eps = pCfg.endpoints || {};
            const ep = eps[STATE.currentCategory] || eps.foryou || Object.values(eps)[0];
            if (!ep) return [];

            const pParams = { page: 1 };
            if (ep.includes("limit") || ep.includes("drama") || ep.includes("donghua")) {
                pParams.limit = 18;
            }

            const data = await apiFetch(ep, pParams);
            const rawItems = extractList(data);
            return rawItems.map(item => normalizeCard(item, pId));
        });

        const settled = await Promise.allSettled(promises);
        let results = [];
        for (const res of settled) {
            if (res.status === "fulfilled" && Array.isArray(res.value)) {
                results.push(...res.value);
            }
        }

        if (results.length > 0) {
            STATE.dramas = results;
            elements.sectionCount.textContent = `${results.length} Judul`;
            renderGrid(results);
            
            if (!STATE.featuredDrama || STATE.currentPlatform !== 'all') {
                setHero(results[0]);
            }
        } else {
            elements.dramaGrid.innerHTML = `
                <div class="grid-empty">
                    <p>Tidak ada konten drama ditemukan untuk kategori ini.</p>
                </div>
            `;
        }
    } catch (e) {
        console.error('Error fetching dramas:', e);
        elements.dramaGrid.innerHTML = `
            <div class="grid-empty">
                <p>Gagal memuat katalog drama. Silakan coba pilih platform lain.</p>
            </div>
        `;
    }
}

async function performSearch(keyword) {
    elements.dramaGrid.innerHTML = `
        <div class="grid-loading">
            <div class="spinner"></div>
            <p>Mencari "${keyword}"...</p>
        </div>
    `;
    elements.sectionTitle.textContent = `Hasil Pencarian: "${keyword}"`;

    let targetPlatforms = [];
    if (STATE.currentPlatform !== 'all' && PLATFORM_MAP[STATE.currentPlatform]) {
        targetPlatforms = [STATE.currentPlatform];
    } else {
        targetPlatforms = ["sodareels", "dramawave", "dramabox", "lookseries", "donghuaqueen", "dramaqueen", "mydrama", "goodshort", "honey", "dotdrama"];
    }

    try {
        const promises = targetPlatforms.map(async (pId) => {
            const pCfg = PLATFORM_MAP[pId];
            if (!pCfg || !pCfg.endpoints || !pCfg.endpoints.search) return [];
            const data = await apiFetch(pCfg.endpoints.search, { keyword, page: 1 });
            const rawItems = extractList(data);
            return rawItems.map(item => normalizeCard(item, pId));
        });

        const settled = await Promise.allSettled(promises);
        let allCards = [];
        for (const res of settled) {
            if (res.status === "fulfilled" && Array.isArray(res.value)) {
                allCards.push(...res.value);
            }
        }

        if (allCards.length > 0) {
            STATE.dramas = allCards;
            elements.sectionCount.textContent = `${allCards.length} Hasil`;
            renderGrid(allCards);
        } else {
            elements.dramaGrid.innerHTML = `
                <div class="grid-empty">
                    <p>Tidak ada judul drama yang cocok dengan "${keyword}".</p>
                </div>
            `;
        }
    } catch (e) {
        console.error('Search error:', e);
    }
}

function setHero(drama) {
    STATE.featuredDrama = drama;
    if (!drama) return;

    elements.heroTitle.textContent = drama.title || 'Drama Pilihan';
    elements.heroPlatform.textContent = `${drama.platform_name || 'APULA-FLIX'} EXCLUSIVE`;
    elements.heroRating.textContent = `${drama.rating || '9.8'} Skor`;
    elements.heroEpisodes.textContent = drama.episodes ? `${drama.episodes} Ep` : 'Tamat / Ongoing';
    elements.heroTags.textContent = drama.tags && drama.tags.length ? drama.tags.join(' • ') : 'Drama • Romance • Hot';
    elements.heroSynopsis.textContent = drama.description || 'Tonton kisah seru penuh emosi dan intrik tak terduga sekarang juga secara gratis tanpa buffering.';

    if (drama.cover && drama.cover.startsWith('http')) {
        elements.heroBackdrop.style.backgroundImage = `url('${drama.cover}')`;
    } else {
        elements.heroBackdrop.style.backgroundImage = `url('${DEFAULT_POSTER}')`;
    }
}

function renderGrid(dramas) {
    let html = '';
    dramas.forEach((item, idx) => {
        const coverImg = (item.cover && item.cover.startsWith('http')) ? item.cover : DEFAULT_POSTER;
        const epBadge = item.episodes ? `${item.episodes} Ep` : 'HD';
        const tagText = item.tags && item.tags.length ? item.tags.join(', ') : item.platform_name;

        html += `
            <div class="drama-card" data-index="${idx}">
                <div class="card-poster-wrapper">
                    <img class="card-poster" src="${coverImg}" alt="${item.title}" loading="lazy" onerror="if(this.dataset.fb!=='1'){this.dataset.fb='1';this.src='${DEFAULT_POSTER}';}">
                    <span class="card-platform-tag">${item.platform_name || 'Drama'}</span>
                    <span class="card-ep-badge">${epBadge}</span>
                    <div class="card-play-overlay">
                        <div class="play-circle">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title" title="${item.title}">${item.title}</h3>
                    <div class="card-meta-row">
                        <span class="card-tags">${tagText}</span>
                    </div>
                </div>
            </div>
        `;
    });

    elements.dramaGrid.innerHTML = html;

    elements.dramaGrid.querySelectorAll('.drama-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.index);
            const drama = STATE.dramas[idx];
            if (drama) {
                openPlayer(drama, 1);
            }
        });
    });
}

// Player Modal & Stream Handler
async function openPlayer(drama, episodeNum = 1) {
    STATE.activeDrama = drama;
    STATE.activeEpisodeNum = episodeNum;

    elements.playerDramaTitle.textContent = drama.title;
    elements.playerPlatformBadge.textContent = drama.platform_name || 'Drama';
    elements.playerSynopsis.textContent = drama.description || 'Tidak ada deskripsi tersedia.';
    elements.playerModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    elements.episodeList.innerHTML = `<div class="grid-loading"><div class="spinner"></div><p>Memuat episode...</p></div>`;

    const pCfg = PLATFORM_MAP[drama.platform_id];
    let episodes = [];

    if (pCfg && pCfg.endpoints) {
        const allepEp = pCfg.endpoints.allepisode;
        
        let paramKey = "book_id";
        if (drama.platform_id === "lookseries") paramKey = "vod_id";
        else if (drama.platform_id === "vigloo") paramKey = "video_id";

        try {
            const epData = allepEp ? await apiFetch(allepEp, { [paramKey]: drama.id }) : null;
            const rawEpisodes = extractList(epData);
            
            if (Array.isArray(rawEpisodes) && rawEpisodes.length > 0) {
                rawEpisodes.forEach((ep, idx) => {
                    const epNum = ep.chapterIndex || ep.number_episode || ep.episode || ep.episode_num || ep.index || ep.ep || (idx + 1);
                    const epId = String(ep.chapterId || ep.chapter_id || ep.episode_id || ep.id || ep.eid || ep.nid || epNum);
                    const epTitle = ep.chapterName || ep.title || ep.name || ep.ep_title || `Episode ${epNum}`;
                    const directUrl = ep.link_720 || ep.link720_pro || ep.link720_a || ep.video_url || null;
                    
                    episodes.push({
                        episode_num: epNum,
                        episode_id: epId,
                        title: epTitle,
                        direct_url: directUrl
                    });
                });
            }
        } catch (e) {
            console.error('Error loading allepisode:', e);
        }
    }

    if (episodes.length === 0) {
        const total = drama.episodes ? Math.min(parseInt(drama.episodes) || 30, 120) : 30;
        for (let i = 1; i <= total; i++) {
            episodes.push({
                episode_num: i,
                episode_id: String(i),
                title: `Episode ${i}`,
                direct_url: null
            });
        }
    }

    STATE.activeEpisodesList = episodes;
    elements.sidebarEpCount.textContent = `${episodes.length} Ep`;
    renderEpisodesList(episodes);

    playEpisode(episodeNum);
}

function renderEpisodesList(episodes) {
    let html = '';
    episodes.forEach(ep => {
        const isActive = ep.episode_num === STATE.activeEpisodeNum;
        html += `
            <button class="ep-btn ${isActive ? 'active' : ''}" data-ep="${ep.episode_num}" data-epid="${ep.episode_id}">
                ${ep.title || `Ep ${ep.episode_num}`}
            </button>
        `;
    });

    elements.episodeList.innerHTML = html;

    elements.episodeList.querySelectorAll('.ep-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ep = parseInt(btn.dataset.ep);
            playEpisode(ep);
        });
    });
}

async function playEpisode(episodeNum, forceProxy = false) {
    STATE.activeEpisodeNum = episodeNum;
    elements.playerEpisodeTitle.textContent = `Episode ${episodeNum}`;
    
    elements.episodeList.querySelectorAll('.ep-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.ep) === episodeNum);
    });

    elements.videoLoading.classList.add('show');
    elements.videoLoadingText.textContent = `Mengambil video Ep ${episodeNum}...`;

    if (STATE.hlsInstance) {
        STATE.hlsInstance.destroy();
        STATE.hlsInstance = null;
    }
    elements.mainVideo.pause();
    elements.mainVideo.removeAttribute('src');
    elements.mainVideo.load();

    const drama = STATE.activeDrama;
    const epObj = STATE.activeEpisodesList.find(e => e.episode_num === episodeNum);
    const epId = epObj ? epObj.episode_id : String(episodeNum);
    
    // If we already have a direct link from allepisode
    if (epObj && epObj.direct_url && !forceProxy) {
        loadDirectVideo(epObj.direct_url);
        return;
    }

    const pCfg = PLATFORM_MAP[drama.platform_id];
    if (!pCfg || !pCfg.endpoints || !pCfg.endpoints.stream) {
        elements.videoLoadingText.textContent = 'Stream tidak tersedia untuk platform ini.';
        return;
    }

    let sParams = {};
    const platform = drama.platform_id;
    if (platform === "dramabox") {
        sParams = { book_id: drama.id, episode_num: episodeNum };
    } else if (platform === "dramawave") {
        sParams = { book_id: drama.id, chapter_id: epId || String(episodeNum) };
    } else if (platform === "lookseries") {
        sParams = { vod_id: drama.id, episode: episodeNum };
    } else if (platform === "vigloo") {
        sParams = { season_id: drama.id, episode_num: episodeNum };
    } else if (platform === "honey") {
        sParams = { book_id: drama.id, chapter_id: epId || String(episodeNum) };
    } else if (platform === "goodshort") {
        sParams = { book_id: drama.id, episode_index: episodeNum, episode_id: epId || String(episodeNum) };
    } else {
        sParams = { book_id: drama.id, episode: episodeNum };
    }

    try {
        const streamData = await apiFetch(pCfg.endpoints.stream, sParams);

        if (streamData) {
            let videoUrl = null;
            let streamType = "mp4";
            
            if (typeof streamData === "object") {
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
            } else if (typeof streamData === "string" && streamData.startsWith("http")) {
                videoUrl = streamData;
            }

            if (videoUrl) {
                if (videoUrl.includes(".m3u8")) {
                    streamType = "hls";
                }

                elements.videoLoadingText.textContent = 'Memulai pemutaran...';

                if (streamType === 'hls') {
                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            maxBufferLength: 30,
                            enableWorker: true
                        });
                        hls.loadSource(videoUrl);
                        hls.attachMedia(elements.mainVideo);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            elements.videoLoading.classList.remove('show');
                            elements.mainVideo.play().catch(() => {});
                        });
                        hls.on(Hls.Events.ERROR, (event, data) => {
                            if (data.fatal) {
                                console.warn('HLS error, retrying direct video...');
                                hls.destroy();
                                loadDirectVideo(videoUrl);
                            }
                        });
                        STATE.hlsInstance = hls;
                    } else if (elements.mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
                        elements.mainVideo.src = videoUrl;
                        elements.mainVideo.play().catch(() => {});
                        elements.videoLoading.classList.remove('show');
                    }
                } else {
                    loadDirectVideo(videoUrl);
                }
                return;
            }
        }
        
        elements.videoLoadingText.textContent = 'Stream video belum tersedia untuk episode ini.';
        showToast('Stream video belum tersedia.');
    } catch (e) {
        console.error('Play episode error:', e);
        elements.videoLoadingText.textContent = 'Gagal memuat link video.';
        showToast('Gagal memuat video stream.');
    }
}

function loadDirectVideo(url) {
    elements.mainVideo.src = url;
    elements.mainVideo.onloadeddata = () => {
        elements.videoLoading.classList.remove('show');
        elements.mainVideo.play().catch(() => {});
    };
    elements.mainVideo.onerror = () => {
        elements.videoLoading.classList.remove('show');
    };
}

function closePlayer() {
    elements.playerModal.classList.remove('open');
    document.body.style.overflow = '';
    if (STATE.hlsInstance) {
        STATE.hlsInstance.destroy();
        STATE.hlsInstance = null;
    }
    elements.mainVideo.pause();
    elements.mainVideo.removeAttribute('src');
}

function showToast(msg) {
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3200);
}

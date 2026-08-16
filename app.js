/**
 * APULA-FLIX - HIGH PERFORMANCE CLIENT-SIDE STREAMING CONTROLLER
 * Primary Engine: Serverless Edge Gateway -> https://nunodrama.my.id (Bearer Authenticated)
 * Backup Engine:  Direct Fallback -> https://redmi.nunodrama.my.id (CORS Open)
 */

const BACKUP_API  = "https://redmi.nunodrama.my.id";
const DECRYPT_KEY = "Nuno-secret"; // AES-256 Passphrase for payload decryption

// Safe SVG Data URI with zero double quotes to prevent breaking HTML attributes
const DEFAULT_POSTER = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23222222%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111111%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22450%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22180%22%20r%3D%2236%22%20fill%3D%22%23E50914%22%20opacity%3D%220.85%22%2F%3E%3Cpolygon%20points%3D%22144%2C166%20164%2C180%20144%2C194%22%20fill%3D%22%23ffffff%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22250%22%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3EAPULA-FLIX%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%22275%22%20fill%3D%22%23888888%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3EStreaming%3C%2Ftext%3E%3C%2Fsvg%3E";

const PLATFORMS_CONFIG = [
    {
        id: "sodareels",
        name: "SodaReels",
        badge: "260+ Drama HD",
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
        id: "shortmax",
        name: "ShortMax",
        badge: "Trending",
        icon: "🚀",
        endpoints: {
            foryou: "/api/shortmax_v2/foryou",
            trending: "/api/shortmax_v2/foryou",
            search: "/api/shortmax_v2/search",
            detail: "/api/shortmax_v2/detail",
            stream: "/api/shortmax_v2/stream"
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
    currentPage: 1,
    itemsPerPage: 24,
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
    paginationContainer: document.getElementById('paginationContainer'),
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

// Complete URL Sanitizer - Routes Whatbox & HLS/HTTP media through authenticated HTTPS proxies (Idempotent)
function sanitizeMediaUrl(url, platform = 'donghuaqueen') {
    if (!url || typeof url !== 'string') return '';
    
    // Auto-heal offline greip host to active santol mirror
    if (url.includes('greip.whatbox.ca')) {
        url = url.replace('greip.whatbox.ca', 'santol.whatbox.ca');
    }

    // Guard: Prevent recursive / nested proxy wrapping
    if (url.includes('/api/donghuaqueen/proxy_video') ||
        url.includes('/api/dramaqueen/proxy_video') ||
        url.includes('/api/lookseries/proxy') ||
        url.includes('/api/proxy_stream')) {
        return url;
    }

    if (url.includes('whatbox.ca')) {
        if (platform === 'lookseries' || url.includes('lookseries')) {
            return `https://redmi.nunodrama.my.id/api/lookseries/proxy?url=${encodeURIComponent(url)}`;
        } else if (platform === 'dramaqueen' || url.includes('/drama/') || url.includes('rambutan.whatbox.ca') || url.includes('santol.whatbox.ca') || url.includes('elara.whatbox.ca')) {
            return `https://redmi.nunodrama.my.id/api/dramaqueen/proxy_video?url=${encodeURIComponent(url)}`;
        } else if (platform === 'donghuaqueen' || url.includes('oberon.whatbox.ca')) {
            return `https://redmi.nunodrama.my.id/api/donghuaqueen/proxy_video?url=${encodeURIComponent(url)}`;
        } else {
            return `https://redmi.nunodrama.my.id/api/donghuaqueen/proxy_video?url=${encodeURIComponent(url)}`;
        }
    }

    // Route any third-party HLS m3u8 playlists (MyDrama, DramaWave, etc.) or insecure HTTP streams through Edge Proxy
    if (url.includes('.m3u8') || url.startsWith('http://') || url.includes('my-drama.tv') || url.includes('mydramawave.com')) {
        return `/api/proxy_stream?url=${encodeURIComponent(url)}`;
    }

    return url;
}

// AES Decryption Helper for NunoDrama Payloads
function decryptNunoData(ciphertext) {
    if (typeof ciphertext !== 'string' || !ciphertext.startsWith('U2FsdGVk')) {
        return ciphertext;
    }
    try {
        if (window.CryptoJS) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, DECRYPT_KEY);
            const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedStr) {
                return JSON.parse(decryptedStr);
            }
        }
    } catch (e) {
        console.warn('Decryption error:', e);
    }
    return ciphertext;
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderPlatformDropdown(PLATFORMS_CONFIG);
    renderPlatformPills(PLATFORMS_CONFIG);
    loadDramas();
});

// Document-level clean fallback for images (eliminates inline onerror syntax errors)
document.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG' && e.target.classList.contains('card-poster')) {
        if (e.target.dataset.fb !== '1') {
            e.target.dataset.fb = '1';
            e.target.src = DEFAULT_POSTER;
        }
    }
}, true);

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

    elements.closePlayerBtn.addEventListener('closePlayerBtn', closePlayer);
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
    STATE.currentPage = 1;
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
    STATE.currentPage = 1;
    
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

// Data Normalization & Extraction (Supports Encrypted Nested Payloads & All Schema Formats)
function extractList(data) {
    if (!data) return [];
    if (typeof data === 'string' && data.startsWith('U2FsdGVk')) {
        data = decryptNunoData(data);
    }
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && data !== null) {
        if (typeof data.data === 'string' && data.data.startsWith('U2FsdGVk')) {
            data.data = decryptNunoData(data.data);
        }
        if (Array.isArray(data.data)) return data.data;

        if (data.data && typeof data.data === 'object') {
            if (Array.isArray(data.data.data)) return data.data.data;
            if (Array.isArray(data.data.list)) return data.data.list;
            if (Array.isArray(data.data.items)) return data.data.items;
            if (Array.isArray(data.data.records)) return data.data.records;
            if (Array.isArray(data.data.episodes)) return data.data.episodes;
            if (Array.isArray(data.data.books)) return data.data.books;
        }

        for (const key of ['books', 'data', 'list', 'items', 'records', 'dramas', 'results', 'dataList', 'programList', 'vod_list', 'episodes', 'chapterList', 'categories', 'lists']) {
            if (Array.isArray(data[key]) && data[key].length > 0) {
                return data[key];
            } else if (data[key] && typeof data[key] === 'object') {
                if (Array.isArray(data[key].data)) return data[key].data;
                if (Array.isArray(data[key].list)) return data[key].list;
                if (Array.isArray(data[key].items)) return data[key].items;
                if (Array.isArray(data[key].records)) return data[key].records;
                if (Array.isArray(data[key].episodes)) return data[key].episodes;
                if (Array.isArray(data[key].books)) return data[key].books;
            }
        }
    }
    return [];
}

function normalizeCard(item, platformId) {
    const pInfo = PLATFORM_MAP[platformId] || { name: platformId.toUpperCase(), badge: "HD" };
    
    const dramaId = String(
        item.bookId || item.book_id || item.id || item.vid ||
        item.vod_id || item.drama_id || item.dramaId || item.shortPlayId || item.subject_id || item.movieId || ""
    );
    
    const title = (
        item.bookName || item.title || item.name ||
        item.drama_name || item.vod_name || item.video_name ||
        item.dramaName || "Untitled Drama"
    );
    
    let cover = (
        item.cover || item.cover_url || item.coverWap || item.image || item.thumb ||
        item.poster || item.img || item.img_landscape_url || item.vod_pic ||
        item.horizontal_cover || item.vertical_cover || ""
    );
    if (cover) {
        if (cover.startsWith('http://')) {
            cover = cover.replace('http://', 'https://');
        } else if (!cover.startsWith('http')) {
            if (cover.startsWith('series-descriptions') || cover.startsWith('/series-descriptions')) {
                cover = `https://img.shorten.watch/${cover.replace(/^\//, '')}`;
            }
        }
    }
    if (!cover) {
        const cleanTitle = (title || 'Drama HD').substring(0, 24).replace(/[<>&"]/g, '');
        cover = `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231a1a2e%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2316213e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22450%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22160%22%20r%3D%2236%22%20fill%3D%22%23E50914%22%20opacity%3D%220.85%22%2F%3E%3Cpolygon%20points%3D%22144%2C146%20164%2C160%20144%2C174%22%20fill%3D%22%23ffffff%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22230%22%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(cleanTitle)}%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%22260%22%20fill%3D%22%23e50914%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(pInfo.name || 'APULA-FLIX')}%3C%2Ftext%3E%3C%2Fsvg%3E`;
    }
    
    const desc = (
        item.description || item.synopsis || item.intro || item.introduction ||
        item.summary || item.brief || ""
    );
    
    const episodes = (
        item.chapterCount || item.total_episode || item.totalEpisodes || item.jumlah_episode || item.episode_final ||
        item.num_videos || item.episodes_count || item.total_chapter || item.episode || item.episode_num || item.total || null
    );
    
    let tags = item.tagList || item.genres || item.genre || item.labels || item.label || item.tags || item.categories || item.category || [];
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

// Universal API Client with Intelligent Failover & Payload Decryption
async function apiFetch(endpoint, params = {}) {
    const q = new URLSearchParams(params).toString();
    const queryStr = q ? '?' + q : '';

    // 1. Primary: Route via same-origin Cloudflare Edge Gateway (Zero CORS Block)
    try {
        const edgeUrl = `${endpoint}${queryStr}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);

        const resp = await fetch(edgeUrl, {
            headers: { 'Accept': 'application/json, text/plain, */*' },
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (resp.ok) {
            const rawText = await resp.text();
            let resData = null;
            try {
                resData = JSON.parse(rawText);
            } catch (e) {
                resData = rawText;
            }
            if (resData && typeof resData === 'object' && typeof resData.data === 'string' && resData.data.startsWith('U2FsdGVk')) {
                resData.data = decryptNunoData(resData.data);
            }
            return resData;
        }
    } catch (e) {
        // Fallback to direct CORS backup
    }

    // 2. Backup Direct Fallback: redmi.nunodrama.my.id (CORS Open)
    try {
        const backupUrl = `${BACKUP_API}${endpoint}${queryStr}`;
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 12000);

        const bResp = await fetch(backupUrl, {
            mode: 'cors',
            headers: { 'Accept': 'application/json, text/plain, */*' },
            signal: controller2.signal
        });
        clearTimeout(timeout2);

        if (bResp.ok) {
            const rawText = await bResp.text();
            let resData = null;
            try {
                resData = JSON.parse(rawText);
            } catch (e) {
                resData = rawText;
            }
            if (resData && typeof resData === 'object' && typeof resData.data === 'string' && resData.data.startsWith('U2FsdGVk')) {
                resData.data = decryptNunoData(resData.data);
            }
            return resData;
        }
    } catch (e) {}

    return null;
}

// Fetch and Render Drama Catalog with Progressive Real-Time Streaming & Pagination
async function loadDramas() {
    elements.dramaGrid.innerHTML = `
        <div class="grid-loading">
            <div class="spinner"></div>
            <p>Memuat tayangan terbaik...</p>
        </div>
    `;
    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';

    let targetPlatforms = [];
    if (STATE.currentPlatform !== 'all' && PLATFORM_MAP[STATE.currentPlatform]) {
        targetPlatforms = [STATE.currentPlatform];
    } else {
        targetPlatforms = ["dramaqueen", "dramabox", "dotdrama", "mydrama", "shortmax", "sodareels", "lookseries", "donghuaqueen", "dramawave", "minishort", "goodshort", "shorten", "honey", "soreel", "fundrama", "bibishort"];
    }

    let loadedCards = [];
    let hasRenderedAny = false;

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

        try {
            const data = await apiFetch(ep, pParams);
            const rawItems = extractList(data);
            const cards = rawItems.map(item => normalizeCard(item, pId));
            if (cards.length > 0) {
                loadedCards.push(...cards);
                STATE.dramas = loadedCards;
                renderPaginatedView();
                if (!hasRenderedAny) {
                    hasRenderedAny = true;
                    setHero(cards[0]);
                }
            }
            return cards;
        } catch (e) {
            return [];
        }
    });

    await Promise.allSettled(promises);

    if (loadedCards.length === 0) {
        elements.dramaGrid.innerHTML = `
            <div class="grid-empty">
                <p>Tidak ada konten drama ditemukan untuk kategori ini.</p>
            </div>
        `;
        if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
    } else {
        renderPaginatedView();
    }
}

async function performSearch(keyword) {
    elements.dramaGrid.innerHTML = `
        <div class="grid-loading">
            <div class="spinner"></div>
            <p>Mencari "${keyword}"...</p>
        </div>
    `;
    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
    elements.sectionTitle.textContent = `Hasil Pencarian: "${keyword}"`;
    STATE.currentPage = 1;

    let targetPlatforms = [];
    if (STATE.currentPlatform !== 'all' && PLATFORM_MAP[STATE.currentPlatform]) {
        targetPlatforms = [STATE.currentPlatform];
    } else {
        targetPlatforms = ["sodareels", "dramawave", "dramabox", "shortmax", "lookseries", "donghuaqueen", "dramaqueen", "mydrama", "goodshort", "honey", "dotdrama"];
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
            renderPaginatedView();
        } else {
            elements.dramaGrid.innerHTML = `
                <div class="grid-empty">
                    <p>Tidak ada judul drama yang cocok dengan "${keyword}".</p>
                </div>
            `;
            if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
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

// Render Current Page Slice and Pagination Controls
function renderPaginatedView() {
    const totalItems = STATE.dramas.length;
    if (totalItems === 0) {
        elements.dramaGrid.innerHTML = `
            <div class="grid-empty">
                <p>Tidak ada konten drama ditemukan untuk kategori ini.</p>
            </div>
        `;
        if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.max(1, Math.ceil(totalItems / STATE.itemsPerPage));
    if (STATE.currentPage > totalPages) {
        STATE.currentPage = 1;
    }

    const startIndex = (STATE.currentPage - 1) * STATE.itemsPerPage;
    const endIndex = Math.min(startIndex + STATE.itemsPerPage, totalItems);
    const pageItems = STATE.dramas.slice(startIndex, endIndex);

    elements.sectionCount.textContent = `${totalItems} Judul (Hal ${STATE.currentPage} dari ${totalPages})`;
    renderGrid(pageItems, startIndex);
    renderPagination(totalItems, STATE.currentPage, STATE.itemsPerPage);
}

function goToPage(pageNum) {
    const totalPages = Math.max(1, Math.ceil(STATE.dramas.length / STATE.itemsPerPage));
    if (pageNum < 1 || pageNum > totalPages) return;
    STATE.currentPage = pageNum;
    renderPaginatedView();

    const section = document.getElementById('currentSectionTitle');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderPagination(totalItems, currentPage, itemsPerPage) {
    if (!elements.paginationContainer) return;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        elements.paginationContainer.innerHTML = '';
        return;
    }

    let html = '';

    // Prev Button
    html += `
        <button class="page-btn page-prev" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            ‹ Prev
        </button>
    `;

    // Window logic for pages
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        html += `<button class="page-btn" data-page="1">1</button>`;
        if (startPage > 2) {
            html += `<span class="page-ellipsis">…</span>`;
        }
    }

    for (let p = startPage; p <= endPage; p++) {
        const isActive = p === currentPage;
        html += `<button class="page-btn ${isActive ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span class="page-ellipsis">…</span>`;
        }
        html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    // Next Button
    html += `
        <button class="page-btn page-next" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            Next ›
        </button>
    `;

    elements.paginationContainer.innerHTML = html;

    elements.paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const p = parseInt(btn.dataset.page);
            if (!isNaN(p) && p >= 1 && p <= totalPages && p !== STATE.currentPage) {
                goToPage(p);
            }
        });
    });
}

function renderGrid(dramas, baseIndex = 0) {
    let html = '';
    dramas.forEach((item, idx) => {
        const actualIdx = baseIndex + idx;
        const coverImg = (item.cover && item.cover.startsWith('http')) ? item.cover : DEFAULT_POSTER;
        const epBadge = item.episodes ? `${item.episodes} Ep` : 'HD';
        const tagText = item.tags && item.tags.length ? item.tags.join(', ') : item.platform_name;

        html += `
            <div class="drama-card" data-index="${actualIdx}">
                <div class="card-poster-wrapper">
                    <img class="card-poster" src="${coverImg}" alt="${item.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${DEFAULT_POSTER}'">
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
        else if (drama.platform_id === "shortmax") paramKey = "drama_id";

        try {
            let epData = null;
            if (drama.platform_id === "donghuaqueen" || drama.platform_id === "dramaqueen") {
                epData = await apiFetch(pCfg.endpoints.detail, { book_id: drama.id });
            } else if (drama.platform_id === "shortmax" && pCfg.endpoints.detail) {
                epData = await apiFetch(pCfg.endpoints.detail, { drama_id: drama.id });
            } else if (allepEp) {
                epData = await apiFetch(allepEp, { [paramKey]: drama.id });
            }

            // Extract total count if detail returned object with totalEpisodes
            if (epData && typeof epData === 'object') {
                let dObj = epData.data || epData;
                if (typeof dObj === 'string' && dObj.startsWith('U2FsdGVk')) {
                    dObj = decryptNunoData(dObj);
                }
                const totalCount = dObj.totalEpisodes || dObj.updateEpisode || dObj.episodeCount || dObj.total_episodes || dObj.num_videos;
                if (totalCount && parseInt(totalCount) > 0) {
                    const count = Math.min(parseInt(totalCount), 200);
                    for (let i = 1; i <= count; i++) {
                        episodes.push({
                            episode_num: i,
                            episode_id: String(i),
                            title: `Episode ${i}`,
                            direct_url: null,
                            alternate_urls: []
                        });
                    }
                }
            }

            const rawEpisodes = extractList(epData);
            if (Array.isArray(rawEpisodes) && rawEpisodes.length > 0) {
                episodes = []; // Override with explicit episode list
                rawEpisodes.forEach((ep, idx) => {
                    const epNum = ep.chapterIndex || ep.number_episode || ep.episode || ep.episode_num || ep.index || ep.ep || (idx + 1);
                    const epId = String(ep.episodeId || ep.episode_id || ep.chapterId || ep.chapter_id || ep.id || ep.eid || ep.nid || epNum);
                    const epTitle = ep.chapterName || ep.title || ep.name || ep.ep_title || `Episode ${epNum}`;
                    
                    const candidates = [
                        ep.link720_en,
                        ep.link720_premium,
                        ep.link720_a,
                        ep.link_720,
                        ep.link_1080,
                        ep.playUrl,
                        ep.play_url,
                        ep.videoUrl,
                        ep.video_url,
                        ep.stream_url,
                        ep.link720_pro,
                        ep.link_hls_premium,
                        ep.link_hls,
                        ep.link720_b,
                        ep.url
                    ].filter(u => typeof u === 'string' && u.trim().length > 0);

                    const fixedCandidates = candidates.map(u => u.replace("greip.whatbox.ca", "santol.whatbox.ca"));
                    const directUrl = fixedCandidates.length > 0 ? sanitizeMediaUrl(fixedCandidates[0], drama.platform_id) : null;
                    const alternateUrls = fixedCandidates.slice(1).map(u => sanitizeMediaUrl(u, drama.platform_id));
                    
                    episodes.push({
                        episode_num: epNum,
                        episode_id: epId,
                        title: epTitle,
                        direct_url: directUrl,
                        alternate_urls: alternateUrls
                    });
                });
            }
        } catch (e) {
            console.error('Error loading episodes:', e);
        }
    }

    if (episodes.length === 0) {
        const total = drama.episodes ? Math.min(parseInt(drama.episodes) || 30, 120) : 30;
        for (let i = 1; i <= total; i++) {
            episodes.push({
                episode_num: i,
                episode_id: String(i),
                title: `Episode ${i}`,
                direct_url: null,
                alternate_urls: []
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

    // Completely tear down and detach any active Hls.js instance
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
    
    // If we already have a direct stream link from allepisode (e.g. BibiShort, DonghuaQueen, DramaQueen)
    if (epObj && epObj.direct_url && !forceProxy) {
        const directPlayUrl = sanitizeMediaUrl(epObj.direct_url, drama.platform_id);
        const isHls = directPlayUrl.includes(".m3u8");
        if (isHls) {
            elements.videoLoadingText.textContent = 'Memulai pemutaran HLS...';
            if (Hls.isSupported()) {
                const hls = new Hls({ maxBufferLength: 30, enableWorker: true });
                hls.loadSource(directPlayUrl);
                hls.attachMedia(elements.mainVideo);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    elements.videoLoading.classList.remove('show');
                    elements.mainVideo.play().catch(() => {});
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        elements.videoLoading.classList.remove('show');
                        if (epObj.alternate_urls && epObj.alternate_urls.length > 0) {
                            playDirectVideo(epObj.alternate_urls[0], epObj.alternate_urls.slice(1));
                        }
                    }
                });
                STATE.hlsInstance = hls;
            } else if (elements.mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
                elements.mainVideo.src = directPlayUrl;
                elements.mainVideo.play().catch(() => {});
                elements.videoLoading.classList.remove('show');
            }
            return;
        }

        playDirectVideo(directPlayUrl, epObj.alternate_urls || []);
        return;
    }

    const pCfg = PLATFORM_MAP[drama.platform_id];
    if (!pCfg || !pCfg.endpoints || !pCfg.endpoints.stream) {
        elements.videoLoadingText.textContent = 'Stream tidak tersedia untuk platform ini.';
        return;
    }

    const platform = drama.platform_id;
    if (platform === "shortmax") {
        const streamUrl = `/api/shortmax_v2/stream?drama_id=${encodeURIComponent(drama.id)}&episode_index=${episodeNum}`;
        elements.videoLoadingText.textContent = 'Memulai pemutaran HLS...';
        if (Hls.isSupported()) {
            const hls = new Hls({ maxBufferLength: 30, enableWorker: true });
            hls.loadSource(streamUrl);
            hls.attachMedia(elements.mainVideo);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                elements.videoLoading.classList.remove('show');
                elements.mainVideo.play().catch(() => {});
            });
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    elements.videoLoading.classList.remove('show');
                    showToast('Stream video belum tersedia di server hulu untuk episode ini.', 'error');
                }
            });
            STATE.hlsInstance = hls;
        } else if (elements.mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
            elements.mainVideo.src = streamUrl;
            elements.mainVideo.play().catch(() => {});
            elements.videoLoading.classList.remove('show');
        }
        return;
    }

    let sParams = {};
    if (platform === "bibishort") {
        sParams = { book_id: drama.id, episode_id: epId || String(episodeNum) };
    } else if (platform === "dramabox") {
        sParams = { book_id: drama.id, episode_num: episodeNum };
    } else if (platform === "dramawave") {
        sParams = { book_id: drama.id, chapter_id: epId || String(episodeNum) };
    } else if (platform === "lookseries") {
        sParams = { vod_id: drama.id, episode: episodeNum };
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
            
            let d = streamData.data || streamData;
            // Handle AES-encrypted stream payload
            if (typeof d === 'string' && d.startsWith('U2FsdGVk')) {
                d = decryptNunoData(d);
            }

            if (typeof d === "object" && d !== null) {
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
            } else if (typeof d === "string" && d.startsWith("http")) {
                videoUrl = d;
            }

            if (videoUrl) {
                // Ensure 100% HTTPS / Secure proxy
                videoUrl = sanitizeMediaUrl(videoUrl, platform);

                const isM3u8 = videoUrl.includes(".m3u8") || videoUrl.includes("/proxy_stream");
                const isDirectMp4 = (videoUrl.includes(".mp4") || videoUrl.includes("whatbox.ca")) && !videoUrl.includes(".m3u8");

                if (isM3u8 && !isDirectMp4) {
                    streamType = "hls";
                    if (videoUrl.includes("mydramawave.com") || platform === "dramawave" || videoUrl.startsWith('http://')) {
                        videoUrl = `/api/proxy_stream?url=${encodeURIComponent(videoUrl)}`;
                    }
                } else {
                    streamType = "mp4";
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
                                console.warn('HLS stream error:', data.type);
                                switch (data.type) {
                                    case Hls.ErrorTypes.NETWORK_ERROR:
                                        console.warn('HLS network error, attempting auto-retry...');
                                        hls.startLoad();
                                        break;
                                    case Hls.ErrorTypes.MEDIA_ERROR:
                                        console.warn('HLS media error, recovering...');
                                        hls.recoverMediaError();
                                        break;
                                    default:
                                        elements.videoLoading.classList.remove('show');
                                        break;
                                }
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

function loadDirectVideo(url, fallbackUrls = []) {
    if (STATE.hlsInstance) {
        STATE.hlsInstance.destroy();
        STATE.hlsInstance = null;
    }
    const safeUrl = sanitizeMediaUrl(url, STATE.activeDrama ? STATE.activeDrama.platform_id : 'donghuaqueen');
    elements.mainVideo.src = safeUrl;
    elements.mainVideo.oncanplay = () => {
        elements.videoLoading.classList.remove('show');
        elements.mainVideo.play().catch(() => {});
    };
    elements.mainVideo.onloadeddata = () => {
        elements.videoLoading.classList.remove('show');
        elements.mainVideo.play().catch(() => {});
    };
    elements.mainVideo.onerror = (e) => {
        if (fallbackUrls && fallbackUrls.length > 0) {
            const nextUrl = fallbackUrls[0];
            const remaining = fallbackUrls.slice(1);
            elements.videoLoadingText.textContent = 'Mencoba server cadangan...';
            loadDirectVideo(nextUrl, remaining);
            return;
        }
        elements.videoLoading.classList.remove('show');
        console.warn('Direct video error:', e);
        showToast('Stream video belum tersedia di server hulu.');
    };
}
const playDirectVideo = loadDirectVideo;

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

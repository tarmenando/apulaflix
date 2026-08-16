/**
 * APULA-FLIX - JAVASCRIPT CONTROLLER (RESPONSIVE)
 */

const STATE = {
    currentPlatform: 'all',
    currentCategory: 'foryou',
    currentSearch: '',
    platforms: [],
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
    loadPlatforms();
    loadDramas();
    startKeepAlive();
});

function initEvents() {
    // Scroll navbar background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Platform Dropdown Toggle
    elements.platformDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.platformDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        elements.platformDropdown.classList.remove('show');
    });

    // Desktop Nav Category Tabs
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setCategory(tab.dataset.category);
        });
    });

    // Mobile Category Bar Pills
    if (elements.mobileCategoryBar) {
        elements.mobileCategoryBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.cat-pill');
            if (btn) {
                setCategory(btn.dataset.category);
            }
        });
    }

    // Filter Pills Bar (Platforms)
    elements.filterPillsBar.addEventListener('click', (e) => {
        const pill = e.target.closest('.pill');
        if (!pill) return;
        setPlatform(pill.dataset.platform);
    });

    // Mobile Bottom Nav
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

    // Search Input & Clear
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

    // Hero Buttons
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

    // Player Modal Controls
    elements.closePlayerBtn.addEventListener('click', closePlayer);
    elements.closePlayerBackdrop.addEventListener('click', closePlayer);

    // Episode filter search
    elements.epSearchInput.addEventListener('input', (e) => {
        const filterVal = e.target.value.trim().toLowerCase();
        const epButtons = elements.episodeList.querySelectorAll('.ep-btn');
        epButtons.forEach(btn => {
            const txt = btn.textContent.toLowerCase();
            btn.style.display = txt.includes(filterVal) ? 'block' : 'none';
        });
    });

    // Video Navigation Buttons
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

    // Auto-play next episode
    elements.mainVideo.addEventListener('ended', () => {
        if (STATE.activeEpisodeNum < STATE.activeEpisodesList.length) {
            showToast(`Memutar Episode ${STATE.activeEpisodeNum + 1}...`);
            playEpisode(STATE.activeEpisodeNum + 1);
        }
    });

    // Proxy Fallback Button
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

    // Sync Desktop Tabs
    elements.navTabs.forEach(t => {
        t.classList.toggle('active', t.dataset.category === category);
    });

    // Sync Mobile Pills
    if (elements.mobileCategoryBar) {
        elements.mobileCategoryBar.querySelectorAll('.cat-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.category === category);
        });
    }

    updateSectionTitle();
    loadDramas();
}

async function loadPlatforms() {
    try {
        const res = await fetch('/api/platforms');
        const data = await res.json();
        if (data.success && data.platforms) {
            STATE.platforms = data.platforms;
            if (elements.platformBadgeCount) {
                elements.platformBadgeCount.textContent = `${data.platforms.length} Aktif`;
            }
            renderPlatformDropdown(data.platforms);
        }
    } catch (e) {
        console.error('Error loading platforms:', e);
    }
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

    elements.platformList.querySelectorAll('.platform-item').forEach(item => {
        item.addEventListener('click', () => {
            const pId = item.dataset.id;
            setPlatform(pId);
        });
    });
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

    // Sync Dropdown items
    elements.platformList.querySelectorAll('.platform-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === platformId);
    });

    // Sync Pills
    document.querySelectorAll('.pill').forEach(pill => {
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

// Fetch and Render Drama Catalog
async function loadDramas() {
    elements.dramaGrid.innerHTML = `
        <div class="grid-loading">
            <div class="spinner"></div>
            <p>Memuat tayangan terbaik...</p>
        </div>
    `;

    try {
        const url = `/api/browse?platform=${STATE.currentPlatform}&category=${STATE.currentCategory}&page=1`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.success && data.data && data.data.length > 0) {
            STATE.dramas = data.data;
            elements.sectionCount.textContent = `${data.data.length} Judul`;
            renderGrid(data.data);
            
            // Set Hero Banner
            if (!STATE.featuredDrama || STATE.currentPlatform !== 'all') {
                setHero(data.data[0]);
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

    try {
        const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}&platform=${STATE.currentPlatform}`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
            STATE.dramas = data.data;
            elements.sectionCount.textContent = `${data.data.length} Hasil`;
            renderGrid(data.data);
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

const DEFAULT_POSTER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23222222"/><stop offset="100%" stop-color="%23111111"/></linearGradient></defs><rect width="300" height="450" fill="url(%23g)"/><rect x="6" y="6" width="288" height="438" rx="6" fill="none" stroke="%23333333" stroke-width="2"/><circle cx="150" cy="180" r="36" fill="%23E50914" opacity="0.85"/><polygon points="144,166 164,180 144,194" fill="%23ffffff"/><text x="150" y="250" fill="%23ffffff" font-family="-apple-system,sans-serif" font-size="15" font-weight="bold" text-anchor="middle">APULA-FLIX</text><text x="150" y="275" fill="%23888888" font-family="-apple-system,sans-serif" font-size="12" text-anchor="middle">Streaming</text></svg>`;

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

    // Attach click events
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

    // Fetch details & episodes
    try {
        const res = await fetch(`/api/detail?platform=${drama.platform_id}&id=${drama.id}`);
        const data = await res.json();
        
        if (data.success && data.episodes && data.episodes.length > 0) {
            STATE.activeEpisodesList = data.episodes;
            elements.sidebarEpCount.textContent = `${data.episodes.length} Ep`;
            renderEpisodesList(data.episodes);
        } else {
            STATE.activeEpisodesList = Array.from({length: 30}, (_, i) => ({
                episode_num: i + 1,
                episode_id: `${i + 1}`,
                title: `Episode ${i + 1}`
            }));
            renderEpisodesList(STATE.activeEpisodesList);
        }
    } catch (e) {
        console.error('Error loading drama detail:', e);
    }

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
    const epId = epObj ? epObj.episode_id : `${episodeNum}`;

    try {
        const res = await fetch(`/api/stream?platform=${drama.platform_id}&id=${drama.id}&episode=${episodeNum}&episode_id=${epId}`);
        const streamData = await res.json();

        if (streamData.success && streamData.video_url) {
            let targetUrl = streamData.video_url;
            if (forceProxy || streamData.platform === 'dramaqueen' || streamData.platform === 'donghuaqueen') {
                targetUrl = streamData.proxy_url;
            }

            elements.videoLoadingText.textContent = 'Memulai pemutaran...';

            if (streamData.stream_type === 'hls' || targetUrl.includes('.m3u8')) {
                if (Hls.isSupported()) {
                    const hls = new Hls({
                        maxBufferLength: 30,
                        enableWorker: true
                    });
                    hls.loadSource(targetUrl);
                    hls.attachMedia(elements.mainVideo);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        elements.videoLoading.classList.remove('show');
                        elements.mainVideo.play().catch(() => {});
                    });
                    hls.on(Hls.Events.ERROR, (event, data) => {
                        if (data.fatal) {
                            console.warn('HLS error, retrying via proxy...');
                            hls.destroy();
                            loadDirectVideo(streamData.proxy_url);
                        }
                    });
                    STATE.hlsInstance = hls;
                } else if (elements.mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
                    elements.mainVideo.src = targetUrl;
                    elements.mainVideo.play().catch(() => {});
                    elements.videoLoading.classList.remove('show');
                }
            } else {
                loadDirectVideo(targetUrl);
            }
        } else {
            elements.videoLoadingText.textContent = 'Stream video belum tersedia untuk episode ini.';
            showToast('Stream video belum tersedia.');
        }
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
        if (!url.includes('/api/proxy_stream')) {
            elements.mainVideo.src = `/api/proxy_stream?url=${encodeURIComponent(url)}`;
            elements.mainVideo.play().catch(() => {});
        }
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

function startKeepAlive() {
    setInterval(async () => {
        try {
            await fetch('/api/ping');
        } catch (e) {}
    }, 25000);
}

function showToast(msg) {
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3200);
}

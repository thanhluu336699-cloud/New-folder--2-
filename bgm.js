document.addEventListener('DOMContentLoaded', () => {
    const btnOpenBgm = document.getElementById('btn-open-bgm');
    const bgmScreen = document.getElementById('bgm-screen');
    const btnCloseBgm = document.getElementById('btn-close-bgm');

    const toggleCheckbox = document.getElementById('bgm-toggle-checkbox');
    const statusText = document.getElementById('bgm-status-text');
    const listContainer = document.getElementById('bgm-list-container');
    const searchInput = document.getElementById('bgm-search-input');
    const trackListEl = document.getElementById('bgm-track-list');
    const audioPlayer = document.getElementById('bgm-audio-player');

    // Dữ liệu danh sách nhạc nền giống ảnh mẫu
    const musicTracks = [
        { id: 1, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music1.mp3" },
        { id: 2, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music2.mp3" },
        { id: 3, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music3.mp3" },
        { id: 4, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music4.mp3" },
        { id: 5, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music5.mp3" },
        { id: 6, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music6.mp3" },
        { id: 7, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music7.mp3" },
        { id: 8, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music8.mp3" },
        { id: 9, title: "Sốt nhẹ", author: "tác giả", duration: "03:00", cover: "assets/music_cover.jpg", src: "assets/music9.mp3" }
    ];

    let currentPlayingId = null;

    // Mở màn hình Background music
    if (btnOpenBgm && bgmScreen) {
        btnOpenBgm.addEventListener('click', () => {
            bgmScreen.classList.remove('hidden');
        });
    }

    // Đóng màn hình Background music
    if (btnCloseBgm && bgmScreen) {
        btnCloseBgm.addEventListener('click', () => {
            bgmScreen.classList.add('hidden');
        });
    }

    // Xử lý gạt Bật / Tắt nhạc nền
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            const isOn = toggleCheckbox.checked;
            if (statusText) statusText.textContent = isOn ? "Bật" : "Tắt";
            if (listContainer) listContainer.classList.toggle('disabled', !isOn);

            if (!isOn && audioPlayer) {
                audioPlayer.pause();
                currentPlayingId = null;
                renderTracks(searchInput ? searchInput.value : "");
            }
        });
    }

    // Render danh sách bài hát
    function renderTracks(keyword = "") {
        if (!trackListEl) return;

        const filtered = musicTracks.filter(track =>
            track.title.toLowerCase().includes(keyword.toLowerCase()) ||
            track.author.toLowerCase().includes(keyword.toLowerCase())
        );

        trackListEl.innerHTML = filtered.map(track => {
            const isPlaying = track.id === currentPlayingId;
            return `
                <div class="bgm-track-item">
                    <div class="bgm-track-left">
                        <div class="bgm-cover">
                            <img src="${track.cover}" alt="${track.title}" onerror="this.style.display='none'">
                        </div>
                        <div class="bgm-info">
                            <div class="bgm-song-title">${track.title}</div>
                            <div class="bgm-song-meta">${track.author} ${track.duration}</div>
                        </div>
                    </div>
                    <button class="bgm-play-btn ${isPlaying ? 'playing' : ''}" data-id="${track.id}" aria-label="Phát nhạc">
                        <i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                    </button>
                </div>
            `;
        }).join('');

        // Bắt sự kiện bấm nút Play / Pause trên từng bài
        trackListEl.querySelectorAll('.bgm-play-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const trackId = Number(btn.getAttribute('data-id'));
                const selectedTrack = musicTracks.find(t => t.id === trackId);

                if (currentPlayingId === trackId) {
                    currentPlayingId = null;
                    if (audioPlayer) audioPlayer.pause();
                } else {
                    currentPlayingId = trackId;
                    if (audioPlayer && selectedTrack) {
                        audioPlayer.src = selectedTrack.src;
                        audioPlayer.play().catch(() => {});
                    }
                }
                renderTracks(searchInput ? searchInput.value : "");
            });
        });
    }

    // Lọc bài hát khi gõ vào ô tìm kiếm
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderTracks(e.target.value);
        });
    }

    renderTracks();
});


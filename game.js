document.addEventListener('DOMContentLoaded', () => {
    const btnOpenGame = document.querySelector('.btn-game');
    const gameScreen = document.getElementById('game-screen');
    const btnCloseGame = document.getElementById('btn-close-game');

    // Dữ liệu mẫu 10 thẻ game (5 hàng x 2 cột giống ảnh)
    const gamesList = [
        { id: 1, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 2, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 3, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 4, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 5, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 6, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 7, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 8, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 9, title: "Game", image: "assets/game_thumb.png", saved: false },
        { id: 10, title: "Game", image: "assets/game_thumb.png", saved: false }
    ];

    // Mở màn hình Game khi bấm nút GAME ở Home
    if (btnOpenGame && gameScreen) {
        btnOpenGame.addEventListener('click', () => {
            gameScreen.classList.remove('hidden');
        });
    }

    // Đóng màn hình Game khi bấm nút <
    if (btnCloseGame && gameScreen) {
        btnCloseGame.addEventListener('click', () => {
            gameScreen.classList.add('hidden');
        });
    }

    // Hàm tạo HTML cho từng thẻ game
    function createGameCardHTML(game) {
        const bookmarkIconClass = game.saved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
        return `
            <div class="game-card" data-id="${game.id}">
                <div class="game-thumb">
                    <img src="${game.image}" alt="${game.title}" onerror="this.style.display='none'">
                </div>
                <div class="game-card-footer">
                    <button class="btn-bookmark" data-id="${game.id}" title="Lưu game">
                        <i class="${bookmarkIconClass}"></i>
                    </button>
                    <button class="btn-play-game" data-id="${game.id}">${game.title}</button>
                </div>
            </div>
        `;
    }

    // Render danh sách cho cả 2 tab
    function renderGames() {
        const allGamesGrid = document.getElementById('all-games-grid');
        const yourGamesGrid = document.getElementById('your-games-grid');

        if (allGamesGrid) {
            allGamesGrid.innerHTML = gamesList.map(createGameCardHTML).join('');
        }

        if (yourGamesGrid) {
            const savedGames = gamesList.filter(g => g.saved);
            if (savedGames.length > 0) {
                yourGamesGrid.innerHTML = savedGames.map(createGameCardHTML).join('');
            } else {
                yourGamesGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #121f6e; font-weight: 700; margin-top: 30px;">Chưa có game nào được lưu</div>`;
            }
        }
    }

    renderGames();

    // Xử lý bấm icon Bookmark để lưu / bỏ lưu game
    if (gameScreen) {
        gameScreen.addEventListener('click', (e) => {
            const bookmarkBtn = e.target.closest('.btn-bookmark');
            if (bookmarkBtn) {
                const gameId = Number(bookmarkBtn.getAttribute('data-id'));
                const targetGame = gamesList.find(g => g.id === gameId);
                if (targetGame) {
                    targetGame.saved = !targetGame.saved;
                    renderGames();
                }
            }
        });
    }

    // Xử lý chuyển đổi giữa tab "Game" và "Your game"
    const gameTabBtns = document.querySelectorAll('.game-tab-btn');
    const gameTabPanes = document.querySelectorAll('.game-tab-pane');

    gameTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gameTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-gametab');
            gameTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const btnOpenBg = document.getElementById('btn-open-background');
    const bgScreen = document.getElementById('background-screen');
    const btnCloseBg = document.getElementById('btn-close-background');

    const mobileScreen = document.querySelector('.mobile-screen');
    const homeCharacterImg = document.querySelector('.character-img');

    // Dữ liệu mẫu cho Màu nền (5 thẻ cuộn ngang giống ảnh)
    const bgColors = [
        { id: 1, thumb: "assets/bg1.jpg", gradient: "linear-gradient(180deg, #6c8ef2 0%, #8ca5f8 50%, #9cb3f9 100%)" },
        { id: 2, thumb: "assets/bg2.jpg", gradient: "linear-gradient(180deg, #ff758c 0%, #ff7eb3 100%)" },
        { id: 3, thumb: "assets/bg3.jpg", gradient: "linear-gradient(180deg, #43cea2 0%, #185a9d 100%)" },
        { id: 4, thumb: "assets/bg4.jpg", gradient: "linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%)" },
        { id: 5, thumb: "assets/bg5.jpg", gradient: "linear-gradient(180deg, #2b5876 0%, #4e4376 100%)" }
    ];

    // Dữ liệu mẫu cho Nhân vật (9 thẻ 3x3 giống ảnh)
    const bgCharacters = [
        { id: 1, name: "Tên", img: "anh3.png" },
        { id: 2, name: "Tên", img: "anh3.png" },
        { id: 3, name: "Tên", img: "anh3.png" },
        { id: 4, name: "Tên", img: "anh3.png" },
        { id: 5, name: "Tên", img: "anh3.png" },
        { id: 6, name: "Tên", img: "anh3.png" },
        { id: 7, name: "Tên", img: "anh3.png" },
        { id: 8, name: "Tên", img: "anh3.png" },
        { id: 9, name: "Tên", img: "anh3.png" }
    ];

    let selectedBgId = 1;
    let selectedCharId = 1;

    // Mở màn hình Hình nền khi bấm vào Background trong Settings
    if (btnOpenBg && bgScreen) {
        btnOpenBg.addEventListener('click', () => {
            bgScreen.classList.remove('hidden');
        });
    }

    // Đóng màn hình Hình nền khi bấm nút <
    if (btnCloseBg && bgScreen) {
        btnCloseBg.addEventListener('click', () => {
            bgScreen.classList.add('hidden');
        });
    }

    // Render danh sách Màu nền
    function renderBgColors() {
        const bgColorList = document.getElementById('bg-color-list');
        if (!bgColorList) return;

        bgColorList.innerHTML = bgColors.map(bg => `
            <div class="bg-color-card ${bg.id === selectedBgId ? 'active' : ''}" data-id="${bg.id}">
                <img src="${bg.thumb}" alt="Background ${bg.id}" onerror="this.style.display='none'">
            </div>
        `).join('');

        bgColorList.querySelectorAll('.bg-color-card').forEach(card => {
            card.addEventListener('click', () => {
                selectedBgId = Number(card.getAttribute('data-id'));
                const chosen = bgColors.find(b => b.id === selectedBgId);
                if (chosen && mobileScreen) {
                    mobileScreen.style.background = chosen.gradient;
                }
                renderBgColors();
            });
        });
    }

    // Render danh sách Nhân vật
    function renderBgCharacters() {
        const bgCharList = document.getElementById('bg-character-list');
        if (!bgCharList) return;

        bgCharList.innerHTML = bgCharacters.map(char => `
            <div class="bg-char-item ${char.id === selectedCharId ? 'active' : ''}" data-id="${char.id}">
                <div class="bg-char-card">
                    <img src="${char.img}" alt="${char.name}" onerror="this.style.display='none'">
                </div>
                <div class="bg-char-name">${char.name}</div>
            </div>
        `).join('');

        bgCharList.querySelectorAll('.bg-char-item').forEach(item => {
            item.addEventListener('click', () => {
                selectedCharId = Number(item.getAttribute('data-id'));
                const chosen = bgCharacters.find(c => c.id === selectedCharId);
                if (chosen && homeCharacterImg) {
                    homeCharacterImg.src = chosen.img;
                }
                renderBgCharacters();
            });
        });
    }

    renderBgColors();
    renderBgCharacters();
});


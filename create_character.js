document.addEventListener('DOMContentLoaded', () => {
    const createCharScreen = document.getElementById('create-character-screen');
    const btnCloseCreateChar = document.getElementById('btn-close-create-char');
    const btnConfirmCreateChar = document.getElementById('btn-confirm-create-char');
    const previewImg = document.getElementById('create-char-preview-img');

    const singersGridEl = document.getElementById('cc-grid-singers');
    const outfitsGridEl = document.getElementById('cc-grid-outfits');
    const tabBtns = document.querySelectorAll('.cc-tab-btn');

    // Dữ liệu mẫu cho tab Ca sĩ (8 ô giống ảnh thiết kế)
    const availableSingers = [
        { id: 1, name: "tên ca sĩ", image: "anh3.png" },
        { id: 2, name: "tên ca sĩ", image: "anh3.png" },
        { id: 3, name: "tên ca sĩ", image: "anh3.png" },
        { id: 4, name: "tên ca sĩ", image: "anh3.png" },
        { id: 5, name: "tên ca sĩ", image: "anh3.png" },
        { id: 6, name: "tên ca sĩ", image: "anh3.png" },
        { id: 7, name: "tên ca sĩ", image: "anh3.png" },
        { id: 8, name: "tên ca sĩ", image: "anh3.png" }
    ];

    // Dữ liệu mẫu cho tab Trang Phục
    const availableOutfits = [
        { id: 101, name: "trang phục 1", image: "anh3.png" },
        { id: 102, name: "trang phục 2", image: "anh3.png" },
        { id: 103, name: "trang phục 3", image: "anh3.png" },
        { id: 104, name: "trang phục 4", image: "anh3.png" }
    ];

    let selectedSinger = null;
    let selectedOutfit = null;

    // Cập nhật khung Preview ở giữa
    function updatePreview() {
        const activeItem = selectedOutfit || selectedSinger;
        if (activeItem && previewImg) {
            previewImg.src = activeItem.image;
            previewImg.style.display = 'block';
        }
    }

    // Render lưới Ca sĩ
    function renderSingersGrid() {
        if (!singersGridEl) return;
        singersGridEl.innerHTML = availableSingers.map(item => `
            <div class="cc-item ${selectedSinger?.id === item.id ? 'selected' : ''}" data-id="${item.id}">
                <div class="cc-item-thumb">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                </div>
                <div class="cc-item-name">${item.name}</div>
            </div>
        `).join('');

        singersGridEl.querySelectorAll('.cc-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = Number(el.getAttribute('data-id'));
                selectedSinger = availableSingers.find(s => s.id === id);
                renderSingersGrid();
                updatePreview();
            });
        });
    }

    // Render lưới Trang Phục
    function renderOutfitsGrid() {
        if (!outfitsGridEl) return;
        outfitsGridEl.innerHTML = availableOutfits.map(item => `
            <div class="cc-item ${selectedOutfit?.id === item.id ? 'selected' : ''}" data-id="${item.id}">
                <div class="cc-item-thumb">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                </div>
                <div class="cc-item-name">${item.name}</div>
            </div>
        `).join('');

        outfitsGridEl.querySelectorAll('.cc-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = Number(el.getAttribute('data-id'));
                selectedOutfit = availableOutfits.find(o => o.id === id);
                renderOutfitsGrid();
                updatePreview();
            });
        });
    }

    // Chuyển đổi giữa Tab "Ca sĩ" và "Trang Phục"
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-cctab');
            if (target === 'singers') {
                singersGridEl.classList.add('active');
                outfitsGridEl.classList.remove('active');
            } else {
                outfitsGridEl.classList.add('active');
                singersGridEl.classList.remove('active');
            }
        });
    });

    // Nút Back (<) quay lại Stage
    if (btnCloseCreateChar && createCharScreen) {
        btnCloseCreateChar.addEventListener('click', () => {
            createCharScreen.classList.add('hidden');
        });
    }

    // Nút "Tạo" góc trên bên phải
    if (btnConfirmCreateChar) {
        btnConfirmCreateChar.addEventListener('click', () => {
            if (!selectedSinger) {
                alert("Vui lòng chọn một ca sĩ trước khi tạo!");
                return;
            }

            if (typeof window.addNewStageSinger === 'function') {
                window.addNewStageSinger({
                    id: Date.now(),
                    name: selectedSinger.name,
                    image: selectedOutfit ? selectedOutfit.image : selectedSinger.image,
                    selected: false
                });
            }

            createCharScreen.classList.add('hidden');
        });
    }

    renderSingersGrid();
    renderOutfitsGrid();
});


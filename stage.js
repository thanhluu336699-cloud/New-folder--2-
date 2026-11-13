document.addEventListener('DOMContentLoaded', () => {
    const btnOpenStage = document.getElementById('btn-open-stage');
    const stageScreen = document.getElementById('stage-screen');
    const btnCloseStage = document.getElementById('btn-close-stage');
    const btnStartPerformance = document.getElementById('btn-start-performance');
    const stageGrid = document.getElementById('stage-character-grid');

    // Dữ liệu mẫu danh sách ca sĩ (5 ca sĩ + 1 nút cộng)
    const stageSingers = [
        { id: 1, name: "tên ca sĩ", image: "anh3.png", selected: true },
        { id: 2, name: "tên ca sĩ", image: "anh3.png", selected: false },
        { id: 3, name: "tên ca sĩ", image: "anh3.png", selected: false },
        { id: 4, name: "tên ca sĩ", image: "anh3.png", selected: false },
        { id: 5, name: "tên ca sĩ", image: "anh3.png", selected: false }
    ];

    // Mở màn hình Stage
    if (btnOpenStage && stageScreen) {
        btnOpenStage.addEventListener('click', () => {
            stageScreen.classList.remove('hidden');
        });
    }

    // Đóng màn hình Stage
    if (btnCloseStage && stageScreen) {
        btnCloseStage.addEventListener('click', () => {
            stageScreen.classList.add('hidden');
        });
    }

    // Render danh sách ca sĩ và nút dấu cộng (+)
    function renderStageSingers() {
        if (!stageGrid) return;

        let html = stageSingers.map(singer => `
            <div class="stage-card-item ${singer.selected ? 'selected' : ''}" data-id="${singer.id}">
                <div class="stage-card-thumb">
                    <img src="${singer.image}" alt="${singer.name}" onerror="this.style.display='none'">
                </div>
                <div class="stage-card-name">${singer.name}</div>
            </div>
        `).join('');

        // Thêm thẻ dấu cộng (+) ở cuối
        html += `
            <div class="stage-add-card" id="btn-add-singer" title="Thêm ca sĩ">
                <i class="fa-solid fa-plus"></i>
            </div>
        `;

        stageGrid.innerHTML = html;

        // Xử lý chọn/bỏ chọn ca sĩ
        stageGrid.querySelectorAll('.stage-card-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = Number(item.getAttribute('data-id'));
                const singer = stageSingers.find(s => s.id === id);
                if (singer) {
                    singer.selected = !singer.selected;
                    renderStageSingers();
                }
            });
        });

        // Xử lý nút dấu cộng (+)
        const btnAddSinger = document.getElementById('btn-add-singer');
        if (btnAddSinger) {
            btnAddSinger.addEventListener('click', () => {
                const newName = prompt("Nhập tên ca sĩ mới:", "tên ca sĩ");
                if (newName && newName.trim() !== "") {
                    stageSingers.push({
                        id: Date.now(),
                        name: newName.trim(),
                        image: "anh3.png",
                        selected: false
                    });
                    renderStageSingers();
                }
            });
        }
    }

    renderStageSingers();

    // Xử lý nút "Vào biểu diễn →"
    if (btnStartPerformance) {
        btnStartPerformance.addEventListener('click', () => {
            const selectedCount = stageSingers.filter(s => s.selected).length;
            if (selectedCount === 0) {
                alert("Vui lòng chọn ít nhất một ca sĩ để biểu diễn!");
            } else {
                alert(`Đang vào sân khấu biểu diễn với ${selectedCount} ca sĩ đã chọn!`);
            }
        });
    }
});


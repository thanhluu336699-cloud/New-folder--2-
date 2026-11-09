// 1. MÙA DỮ LIỆU: Bạn có thể tự thêm, xóa hoặc sửa các mục ở đây tùy ý!
const generalBenefitsData = [
    {
        reward: "5 B",
        description: "Follow us on Facebook to get a reward",
        buttonText: "Go",
        actionUrl: "https://facebook.com" // Link khi bấm nút Go (nếu có)
    },
    {
        reward: "5 B",
        description: "Follow us on Facebook to get a reward",
        buttonText: "Go",
        actionUrl: "#"
    },
];

// 2. Hàm tự động render danh sách ra giao diện
function renderGeneralBenefits() {
    const listContainer = document.getElementById('general-benefits-list');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // Xóa nội dung cũ

    generalBenefitsData.forEach(item => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        taskItem.innerHTML = `
            <div class="task-info">
                <div class="task-reward"><span class="coin-icon">$</span> ${item.reward}</div>
                <div class="task-desc">${item.description}</div>
            </div>
            <button class="btn-go" onclick="window.open('${item.actionUrl}', '_blank')">${item.buttonText}</button>
        `;

        listContainer.appendChild(taskItem);
    });
}

// Gọi hàm render ngay khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderGeneralBenefits();
});



document.querySelectorAll('.footer .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // 1. Đổi active icon trên footer
        document.querySelectorAll('.footer .nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // 2. Ẩn tất cả các màn hình tab
        const allScreens = [
            document.querySelector('.game-content'), // Trang Home
            document.getElementById('shop-screen'),
            document.getElementById('message-screen'),
            document.getElementById('ranking-screen'),
            document.getElementById('benefits-screen')
        ];

        allScreens.forEach(screen => {
            if (screen) screen.classList.add('hidden');
        });

        // 3. Hiển thị màn hình tương ứng với data-target
        const targetId = this.getAttribute('data-target');
        
        if (targetId === 'home-view') {
            document.querySelector('.game-content').classList.remove('hidden');
        } else {
            const targetScreen = document.getElementById(targetId);
            if (targetScreen) {
                targetScreen.classList.remove('hidden');
            }
        }
    });
});
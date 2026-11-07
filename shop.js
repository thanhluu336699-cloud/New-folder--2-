document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.footer .nav-item');
    const homeView = document.getElementById('home-view');
    const shopScreen = document.getElementById('shop-screen');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Xử lý chuyển đổi giao diện khi bấm các nút ở thanh menu dưới
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Đổi trạng thái active trên thanh menu
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const target = item.getAttribute('data-target');

            // Ẩn/hiện màn hình Shop và màn hình Home
            if (target === 'shop-screen') {
                if (shopScreen) shopScreen.classList.remove('hidden');
                if (homeView) homeView.classList.add('hidden');
            } else {
                if (shopScreen) shopScreen.classList.add('hidden');
                if (homeView) homeView.classList.remove('hidden');
            }
        });
    });

    // Chuyển tab danh mục trong Shop
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

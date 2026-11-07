document.addEventListener('DOMContentLoaded', () => {
    // 1. DỮ LIỆU RIÊNG BIỆT CHO TỪNG TRANG/TAB
    const shopData = {
        singers: [
            { name: "Shen Meng Yao", visual: 99, price: "5000B", avatar: "https://i.pravatar.cc/100?img=1" },
            { name: "Idol Singer 2", visual: 95, price: "4500B", avatar: "https://i.pravatar.cc/100?img=2" },
            { name: "Shen Meng Yao", visual: 99, price: "5000B", avatar: "https://i.pravatar.cc/100?img=1" },
            { name: "Idol Singer 2", visual: 95, price: "4500B", avatar: "https://i.pravatar.cc/100?img=2" }
        ],
        outfits: [
            { name: "Set Dạ Hội", desc: "Trang phục biểu diễn sân khấu lớn", price: "1200B" },
            { name: "Set Học Sinh", desc: "Phong cách dễ thương năng động", price: "800B" }
        ],
        effects: [
            { name: "Hiệu ứng Pháo Hoa", price: "800 Gem" },
            { name: "Hiệu ứng Trái Tim Bay", price: "1500 Gem" }
        ],
        premium: [
            { name: "Gói Kim Cương Siêu To", desc: "Nhận ngay 10,000 Gem + Quà", price: "$9.99" },
            { name: "Thẻ Tháng VIP", desc: "Nhận thưởng mỗi ngày trong 30 ngày", price: "$4.99" }
        ]
    };

    // 2. HÀM RENDER RIÊNG CHO TỪNG TAB (Giao diện mỗi trang hoàn toàn độc lập)
    function renderTabsContent() {
        // Render Singers
        const singersGrid = document.getElementById('singers-grid');
        if (singersGrid) {
            singersGrid.innerHTML = shopData.singers.map(item => `
                <div class="shop-card">
                    <div class="card-avatar" style="background-image: url('${item.avatar}'); background-size: cover;"></div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-sub">visual: ${item.visual}</div>
                    <div class="card-price">${item.price}</div>
                </div>
            `).join('');
        }

        // Render Outfits (Ví dụ cấu trúc khác: dạng danh sách ngang/dọc)
        const outfitsGrid = document.getElementById('outfits-grid');
        if (outfitsGrid) {
            outfitsGrid.innerHTML = shopData.outfits.map(item => `
                <div class="custom-outfit-row" style="background: rgba(255,255,255,0.1); padding: 10px; margin-bottom: 10px; border-radius: 8px; color: white;">
                    <div style="font-weight: bold;">${item.name}</div>
                    <div style="font-size: 12px; opacity: 0.8;">${item.desc}</div>
                    <div style="color: yellow; font-weight: bold; margin-top: 5px;">${item.price}</div>
                </div>
            `).join('');
        }

        // Render Effects (Không có visual, chỉ có tên và giá)
        const effectsGrid = document.getElementById('effects-grid');
        if (effectsGrid) {
            effectsGrid.innerHTML = shopData.effects.map(item => `
                <div class="shop-card">
                    <div class="card-title" style="margin-top: 20px;">${item.name}</div>
                    <div class="card-price" style="margin-top: 15px;">${item.price}</div>
                </div>
            `).join('');
        }

        // Render Premium
        const premiumGrid = document.getElementById('premium-grid');
        if (premiumGrid) {
            premiumGrid.innerHTML = shopData.premium.map(item => `
                <div style="background: linear-gradient(45deg, #ff416c, #ff4b2b); padding: 15px; border-radius: 10px; margin-bottom: 10px; color: white;">
                    <h3>${item.name}</h3>
                    <p style="font-size: 12px;">${item.desc}</p>
                    <button style="background: white; color: #ff416c; border: none; padding: 5px 15px; border-radius: 5px; font-weight: bold; margin-top: 8px; cursor: pointer;">${item.price}</button>
                </div>
            `).join('');
        }
    }

    renderTabsContent();

    // 3. XỬ LÝ SỰ KIỆN CHUYỂN TAB
    const tabBtns = document.querySelectorAll('.shop-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-tab');

            // Ẩn tất cả các trang tab, chỉ hiện trang tương ứng
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // 4. XỬ LÝ CHUYỂN MÀN HÌNH CHÍNH (FOOTER NAVBAR)
    const navItems = document.querySelectorAll('.footer .nav-item');
    const homeView = document.getElementById('home-view'); // Lưu ý nếu home của bạn có ID này hoặc màn hình chính chung
    const shopScreen = document.getElementById('shop-screen');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const target = item.getAttribute('data-target');

            if (target === 'shop-screen') {
                if (shopScreen) shopScreen.classList.remove('hidden');
                // Ẩn các view chính khác nếu có
            } else {
                if (shopScreen) shopScreen.classList.add('hidden');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".footer .nav-item");
    const messageScreen = document.getElementById("message-screen");
    const shopScreen = document.getElementById("shop-screen");
    const gameContent = document.querySelector(".game-content");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");

            // Cập nhật trạng thái active cho footer
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // Ẩn tất cả các màn hình chính và màn hình phụ trước
            if (shopScreen) shopScreen.classList.add("hidden");
            if (messageScreen) messageScreen.classList.add("hidden");
            if (gameContent) gameContent.style.display = "none";

            // Bật màn hình tương ứng dựa vào data-target
            if (target === "message-screen") {
                if (messageScreen) messageScreen.classList.remove("hidden");
            } else if (target === "shop-screen") {
                if (shopScreen) shopScreen.classList.remove("hidden");
            } else if (target === "home-view") {
                if (gameContent) {
                    gameContent.style.display = "flex"; // Hoặc 'block' tùy thuộc vào file CSS gốc của bạn
                }
            }
        });
    });
});


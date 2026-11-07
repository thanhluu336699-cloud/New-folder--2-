window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    
    // Đảm bảo màn hình load hiển thị ít nhất 1.5 giây để người chơi kịp nhìn thấy logo,
    // đồng thời chờ trình duyệt tải xong các tài nguyên nặng (ảnh nhân vật, icon,...)
    const minLoadingTime = 1500; 
    const startTime = Date.now();

    const hideSplash = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, remainingTime);
    };

    hideSplash();
});

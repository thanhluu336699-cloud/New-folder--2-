window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const footer = document.querySelector('.footer'); // Lấy element footer
   
    const minLoadingTime = 1500;
    const startTime = Date.now();

    const hideSplash = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            
            // Xóa class hidden để thanh footer hiện lên mượt mà sau khi hết màn hình chờ
            if (footer) {
                footer.classList.remove('hidden');
            }
        }, remainingTime);
    };

    hideSplash();
});


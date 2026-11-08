document.addEventListener('DOMContentLoaded', () => {
    const userProfileBtn = document.querySelector('.user-profile');
    const profileScreen = document.getElementById('profile-screen');
    const btnCloseProfile = document.getElementById('btn-close-profile');

    // Mở trang Profile khi click vào khu vực User Profile trên Header
    if (userProfileBtn && profileScreen) {
        userProfileBtn.addEventListener('click', () => {
            profileScreen.classList.remove('hidden');
        });
    }

    // Đóng trang Profile khi click nút Back
    if (btnCloseProfile && profileScreen) {
        btnCloseProfile.addEventListener('click', () => {
            profileScreen.classList.add('hidden');
        });
    }
});


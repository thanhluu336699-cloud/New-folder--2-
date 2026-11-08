document.addEventListener('DOMContentLoaded', () => {
    // 1. Các phần tử trên màn hình Home
    const homeAvatar = document.querySelector('.header .avatar');
    const homePlayerName = document.querySelector('.header .player-name');
    const userProfileBtn = document.querySelector('.user-profile');

    // 2. Các phần tử trên màn hình Profile
    const profileScreen = document.getElementById('profile-screen');
    const btnCloseProfile = document.getElementById('btn-close-profile');
    const profileAvatar = document.getElementById('profile-avatar-img');
    const profilePlayerName = document.getElementById('profile-player-name');
    const profileBioText = document.getElementById('profile-bio-text');
    
    const btnChangeName = document.getElementById('btn-change-name');
    const btnChangeBio = document.getElementById('btn-change-bio');
    const btnChangeAvatar = document.getElementById('btn-change-avatar');
    const avatarInput = document.getElementById('avatar-input');
    const btnCopyId = document.getElementById('btn-copy-id');
    const userIdText = document.getElementById('user-id-text');

    // --- MỞ & ĐÓNG MÀN HÌNH PROFILE ---
    if (userProfileBtn && profileScreen) {
        userProfileBtn.addEventListener('click', () => {
            profileScreen.classList.remove('hidden');
        });
    }

    if (btnCloseProfile && profileScreen) {
        btnCloseProfile.addEventListener('click', () => {
            profileScreen.classList.add('hidden');
        });
    }

    // --- 1. ĐỔI TÊN & ĐỒNG BỘ TRANG CHỦ ---
    if (btnChangeName) {
        btnChangeName.addEventListener('click', () => {
            const currentName = homePlayerName ? homePlayerName.textContent : profilePlayerName.textContent;
            const newName = prompt("Nhập tên người chơi mới:", currentName);
            
            if (newName && newName.trim() !== "") {
                const formattedName = newName.trim();
                // Đồng bộ cả 2 nơi
                if (homePlayerName) homePlayerName.textContent = formattedName;
                if (profilePlayerName) profilePlayerName.textContent = formattedName.toUpperCase();
            }
        });
    }

    // --- 2. ĐỔI AVATAR & ĐỒNG BỘ TRANG CHỦ ---
    if (btnChangeAvatar && avatarInput) {
        btnChangeAvatar.addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const newAvatarUrl = event.target.result;
                    // Cập nhật ảnh đại diện ở cả 2 màn hình
                    if (homeAvatar) homeAvatar.src = newAvatarUrl;
                    if (profileAvatar) profileAvatar.src = newAvatarUrl;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. ĐỔI MÔ TẢ (BIO) ---
    if (btnChangeBio) {
        btnChangeBio.addEventListener('click', () => {
            const newBio = prompt("Nhập mô tả mới:", profileBioText.textContent);
            if (newBio !== null && newBio.trim() !== "") {
                profileBioText.textContent = newBio.trim();
            }
        });
    }

    // --- 4. SAO CHÉP ID ---
    if (btnCopyId && userIdText) {
        btnCopyId.addEventListener('click', () => {
            navigator.clipboard.writeText(userIdText.textContent);
            alert("Đã sao chép ID: " + userIdText.textContent);
        });
    }
});


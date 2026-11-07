document.addEventListener('DOMContentLoaded', () => {
    const btnSettings = document.querySelector('.btn-settings');
    const settingsModal = document.getElementById('settings-modal');
    const btnBack = document.getElementById('btn-close-settings');

    if (btnSettings && settingsModal) {
        btnSettings.addEventListener('click', () => settingsModal.classList.remove('hidden'));
    }

    if (btnBack && settingsModal) {
        btnBack.addEventListener('click', () => settingsModal.classList.add('hidden'));
    }
});

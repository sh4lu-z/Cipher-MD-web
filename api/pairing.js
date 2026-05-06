// CONFIG is now loaded from config.js
// translations and currentLang are loaded globally from script.js

const socket = io(CONFIG.BACKEND_URL);

// --- Toast Notification System ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    let icon = 'fa-info-circle';
    if(type === 'success') icon = 'fa-circle-check';
    if(type === 'error') icon = 'fa-circle-exclamation';

    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Global scope for switchTab & startQR
window.switchTab = function(t) {
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
    });

    if(t === 'qr') {
        document.querySelectorAll('.t-btn')[1].classList.add('active');
        const qrView = document.getElementById('qr-view');
        qrView.classList.remove('hidden');
        qrView.classList.add('active');
    } else {
        document.querySelectorAll('.t-btn')[0].classList.add('active');
        const pairView = document.getElementById('pair-view');
        pairView.classList.remove('hidden');
        pairView.classList.add('active');
    }
};

window.startQR = function() {
    const qrContainer = document.getElementById('qr-container');
    const btn = document.getElementById('qr-btn');
    
    showToast(translations[currentLang].toast_connecting_sync, "info");
    qrContainer.innerHTML = `<span class="loader spinner" style="width:30px;height:30px;margin:0;"></span><p style="color:var(--text-secondary); font-size:0.85rem; margin-top:10px;">${translations[currentLang].qr_loading}</p>`;
    btn.disabled = true;

    socket.emit('start-session', { usePairingCode: false, bot: "cipherMD" });
};

document.addEventListener('DOMContentLoaded', () => {
    let iti;
    const phoneInput = document.querySelector("#phone-number");
    
    if (phoneInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: "lk",
            separateDialCode: true,
            dropdownContainer: document.body, 
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
        });
    }

    const getCodeBtn = document.getElementById('get-code-btn');
    const pairingDisplay = document.getElementById('pairing-code-display');
    const pCodeText = document.getElementById('p-code');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMsg = document.getElementById('success-msg');
    const copyBtn = document.getElementById('copy-btn');

    if(!getCodeBtn) return; // Prevent errors if running on a page without connect UI

    getCodeBtn.addEventListener('click', () => {
        if (!iti.isValidNumber()) {
            showToast(translations[currentLang].toast_invalid, "error");
            return;
        }

        const fullNumber = iti.getNumber().replace('+', '');

        pairingDisplay.classList.add('hidden');
        successMsg.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        getCodeBtn.disabled = true;
        getCodeBtn.textContent = translations[currentLang].connecting;

        showToast(translations[currentLang].toast_req_code, "info");
        socket.emit('start-session', { usePairingCode: true, phoneNumber: fullNumber, bot: "cipherMD" });
    });

    socket.on('qr', (data) => {
        const qrContainer = document.getElementById('qr-container');
        qrContainer.innerHTML = ""; 
        new QRCode(qrContainer, { text: data.qr, width: 200, height: 200 });
        showToast(translations[currentLang].toast_scan_qr, "success");
    });

    socket.on('pairing-code', (data) => {
        loadingSpinner.classList.add('hidden');
        pairingDisplay.classList.remove('hidden');

        pCodeText.textContent = data.code;
        
        getCodeBtn.disabled = false;
        getCodeBtn.textContent = translations[currentLang].get_code_btn;
        showToast(translations[currentLang].toast_received, "success");
    });

    socket.on('session-success', (data) => {
        pairingDisplay.classList.add('hidden');
        loadingSpinner.classList.add('hidden');
        document.getElementById('qr-view').classList.add('hidden');
        document.getElementById('pair-view').classList.add('hidden');
        
        successMsg.classList.remove('hidden');

        getCodeBtn.disabled = false;
        getCodeBtn.textContent = translations[currentLang].get_code_btn;
        const qrBtn = document.getElementById('qr-btn');
        if(qrBtn) qrBtn.disabled = false;
        showToast(translations[currentLang].toast_success, "success");
    });

    socket.on('error', (data) => {
        showToast(data.message || translations[currentLang].toast_error, "error");
        loadingSpinner.classList.add('hidden');
        getCodeBtn.disabled = false;
        getCodeBtn.textContent = translations[currentLang].get_code_btn;
        const qrBtn = document.getElementById('qr-btn');
        if(qrBtn) qrBtn.disabled = false;
        
        const qrContainer = document.getElementById('qr-container');
        qrContainer.innerHTML = `<i class="fa-solid fa-qrcode fa-3x" style="color:var(--text-secondary); opacity:0.5;"></i><p style="color:var(--text-secondary); font-size:0.85rem; margin-top:10px;" data-key="qr_click_start">${translations[currentLang].qr_click_start}</p>`;
    });

    copyBtn.addEventListener('click', () => {
        const code = pCodeText.textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast(translations[currentLang].toast_copied, "success");
        });
    });
});

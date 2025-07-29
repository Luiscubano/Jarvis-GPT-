import { initDOM } from './dom.js';

let onLoginSuccess = () => {};
let onLogout = () => {};

export function initAuth(domElements, loginSuccessCallback, logoutCallback) {
    onLoginSuccess = loginSuccessCallback;
    onLogout = logoutCallback;

    const { passwordForm, logoutButton } = domElements;
    const MASTER_PASSWORD = atob(window.JARVIS_CONFIG.PIN);

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const { passwordInput, errorMessage } = domElements;
        if (passwordInput.value === MASTER_PASSWORD) {
            sessionStorage.setItem('jarvis_authenticated', 'true');
            togglePasswordModal(false);
            toggleChatContainer(true);
            onLoginSuccess();
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
        }
    });

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('jarvis_authenticated');
        localStorage.removeItem('jarvis_conversation');
        toggleChatContainer(false);
        togglePasswordModal(true);
        onLogout();
    });
}

export function checkAuth(domElements) {
    const isAuthenticated = sessionStorage.getItem('jarvis_authenticated') === 'true';
    if (isAuthenticated) {
        toggleChatContainer(true);
        togglePasswordModal(false);
    } else {
        toggleChatContainer(false);
        togglePasswordModal(true);
    }
    return isAuthenticated;
}

function togglePasswordModal(show) {
    const { passwordModal } = initDOM();
    passwordModal.classList.toggle('hidden', !show);
}

function toggleChatContainer(show) {
    const { chatContainer } = initDOM();
    chatContainer.classList.toggle('hidden', !show);
}


import { initDOM } from './dom.js';
import { clearMessages } from './render.js';
import { initTheme, applyTheme } from './theme.js';
import { initSidebar } from './sidebar.js';
import { initAuth, checkAuth } from './auth.js';
import { initChatManager, loadCombinations, deleteCurrentCombination } from './chat.js';
import { initTTS } from './tts.js';
import { initSpeechRecognition } from './speech.js';
import { initFileHandling } from './files.js';
import { initProjectDownloader } from './projectDownloader.js';
import { initImageGeneration } from './image-gen.js';

/* @tweakable The size of the logo in the password modal. */
const modalLogoSize = '6rem';
/* @tweakable The size of the logo in the chat header. */
const headerLogoSize = '2.5rem';
/* @tweakable The maximum width for the main chat content area. Use Tailwind CSS classes like 'max-w-4xl', 'max-w-5xl', 'max-w-6xl'. */
const chatContentMaxWidth = 'max-w-5xl';

function setChatContainerSize() {
    // This function is no longer needed as the layout is handled by flexbox
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize DOM elements
    const domElements = initDOM();

    // Apply centered layout
    const { mainContentArea, messagesContainer } = domElements;
    if (mainContentArea) {
        const header = mainContentArea.querySelector('header');
        const footer = mainContentArea.querySelector('footer');

        mainContentArea.classList.add('items-center');

        if (header) header.classList.add('w-full', chatContentMaxWidth);
        if (messagesContainer) messagesContainer.classList.add('w-full', chatContentMaxWidth);
        if (footer) footer.classList.add('w-full', chatContentMaxWidth);
    }

    // Set logo sizes
    if (domElements.modalLogo) {
        domElements.modalLogo.style.width = modalLogoSize;
        domElements.modalLogo.style.height = modalLogoSize;
    }
    if (domElements.headerLogo) {
        domElements.headerLogo.style.width = headerLogoSize;
        domElements.headerLogo.style.height = headerLogoSize;
    }

    // 2. Initialize Modules
    initAuth(domElements, () => {
        // This callback is executed on successful login
        loadCombinations();
    }, () => {
        // This callback is executed on logout
        clearMessages();
    });

    initTheme();
    initSidebar();
    initTTS(domElements);
    initSpeechRecognition(domElements);
    initFileHandling(domElements);
    initChatManager(domElements);
    initProjectDownloader(domElements);
    initImageGeneration(domElements);
    
    // Link clear history button
    domElements.clearHistoryButton.addEventListener('click', deleteCurrentCombination);

    // 3. Initial Load sequence
    applyTheme(localStorage.getItem('theme') || 'dark'); // Default to dark theme

    const isAuthenticated = checkAuth(domElements);
    if (isAuthenticated) {
        loadCombinations();
    }

    // Pre-load voices for TTS
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
});
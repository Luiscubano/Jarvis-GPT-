let ttsEnabled = false;
/** @tweakable The pitch of Jarvis's voice. Ranges from 0 (low) to 2 (high). */
const voicePitch = 1.0;
/** @tweakable The speaking rate of Jarvis's voice. Ranges from 0.1 (slow) to 10 (fast). */
const voiceRate = 1.0;
/** @tweakable The preferred language code for the Spanish voice (e.g., 'es-ES' for Spain, 'es-MX' for Mexico). */
const preferredSpanishLang = 'es-ES';

export function speak(text) {
    if (!('speechSynthesis' in window)) {
        console.error("Speech Synthesis not supported in this browser.");
        return;
    }
    window.speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Prioritize Spanish voices
    let selectedVoice = voices.find(v => v.lang === preferredSpanishLang) ||
                      voices.find(v => v.lang === 'es-ES') ||
                      voices.find(v => v.lang === 'es-MX') ||
                      voices.find(v => v.lang === 'es-US') ||
                      voices.find(v => v.lang.startsWith('es-')) ||
                      voices.find(v => v.name.toLowerCase().includes('español')) ||
                      voices.find(v => v.default && v.lang.startsWith('es')) ||
                      voices.find(v => v.default) ||
                      voices[0];

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || 'es-ES';
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;
    window.speechSynthesis.speak(utterance);
}

export function initTTS({ ttsToggleButton }) {
    // Ensure voices are loaded
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {};
    }

    ttsToggleButton.addEventListener('click', () => {
        ttsEnabled = !ttsEnabled;
        ttsToggleButton.classList.toggle('text-cyan-500', ttsEnabled);
        if (!ttsEnabled) {
            window.speechSynthesis.cancel();
        }
    });
}

export function isTtsEnabled() {
    return ttsEnabled;
}
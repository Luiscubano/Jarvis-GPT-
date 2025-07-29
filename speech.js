/** @tweakable The language for speech recognition (e.g., 'es-ES', 'es-MX', 'en-US'). */
const recognitionLang = 'es-MX';
/** @tweakable Whether to show interim (in-progress) speech recognition results in the input box. */
const showInterimResults = true;

export function initSpeechRecognition({ micButton, chatInput, sendButton }) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        micButton.style.display = 'none';
        console.warn("Speech Recognition not supported by this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = recognitionLang;
    recognition.interimResults = showInterimResults;
    recognition.maxAlternatives = 1;

    let isListening = false;

    micButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error("Speech recognition could not be started: ", e);
                isListening = false;
                micButton.classList.remove('listening');
            }
        }
    });

    recognition.onstart = () => {
        isListening = true;
        micButton.classList.add('listening');
    };

    recognition.onend = () => {
        isListening = false;
        micButton.classList.remove('listening');
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error, event.message);
        // onend will be called automatically, which handles UI cleanup.
    };

    recognition.onnomatch = () => {
        console.warn("Speech not recognized.");
    };
    
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        chatInput.value = transcript;

        // If we have a final result, submit the form.
        if (event.results[0].isFinal) {
            const form = chatInput.closest('form');
            if (form) {
                // Use a short delay so the user can see the final text before it's sent
                setTimeout(() => {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }, 100);
            }
        }
    };
}
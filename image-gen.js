import { addImageMessage } from './render.js';
import { saveConversation, getConversationHistory } from './chat.js';

function toggleModal(modal, show) {
    modal.classList.toggle('hidden', !show);
}

function showLoading(loading, formContainer, show) {
    loading.classList.toggle('hidden', !show);
    formContainer.classList.toggle('hidden', show);
}

export function initImageGeneration({ imageGenButton, imageGenModal, imageGenForm, imagePromptInput, cancelImageGenButton, imageGenLoading, imageGenFormContainer, transparentBgToggle }) {
    
    imageGenButton.addEventListener('click', () => {
        toggleModal(imageGenModal, true);
    });

    cancelImageGenButton.addEventListener('click', () => {
        toggleModal(imageGenModal, false);
    });

    imageGenForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = imagePromptInput.value.trim();
        if (!prompt) {
            alert('Por favor, introduce una descripción para la imagen.');
            return;
        }

        const aspectRatio = new FormData(imageGenForm).get('aspect_ratio');
        const transparent = transparentBgToggle.checked;
        
        showLoading(imageGenLoading, imageGenFormContainer, true);

        try {
            /** @tweakable The default prompt for generating images. */
            const imageGenerationPrompt = prompt;
            const result = await websim.imageGen({
                prompt: imageGenerationPrompt,
                aspect_ratio: aspectRatio,
                transparent: transparent,
            });

            addImageMessage(result.url, prompt);

            // Log this action to conversation history
            const conversationHistory = getConversationHistory();
            conversationHistory.push({
                role: 'assistant',
                content: `He generado una imagen basada en la siguiente descripción: "${prompt}"`,
                metadata: { type: 'image_generation', url: result.url, prompt: prompt }
            });
            saveConversation();

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Hubo un error al generar la imagen. Por favor, inténtalo de nuevo.");
        } finally {
            showLoading(imageGenLoading, imageGenFormContainer, false);
            toggleModal(imageGenModal, false);
            imagePromptInput.value = '';
            transparentBgToggle.checked = false;
        }
    });
}
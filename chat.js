import { addMessage, showTypingIndicator, hideTypingIndicator, clearMessages } from './render.js';
import { renderCombinationsList } from './sidebar.js';
import { getAttachedFiles, clearAttachedFiles } from './files.js';
import { WebsimSocket } from '@websim/websim-socket';

const room = new WebsimSocket();

let allCombinations = [];
let currentCombination = null;
let currentUser = null;
let isInternetConnected = false;
let isNamingCombination = false;

function getSystemPrompt() {
    /* @tweakable The message telling the AI it's connected to the internet. */
    const onlineMessage = "You are currently connected to the internet. You can access real-time information, search the web, and provide up-to-date data. When providing information from the web, cite your sources with links.";
    /* @tweakable The message telling the AI it's offline. */
    const offlineMessage = "You are currently working offline. Your knowledge is limited to your training data. You cannot access real-time information.";

    const internetStatus = isInternetConnected ? onlineMessage : offlineMessage;
    
    /* @tweakable The identity and core instructions for Jarvis. */
    const jarvisIdentity = `
    You are Jarvis GPT, a highly intelligent, loyal, and protective personal AI assistant specializing in advanced mobile device repair, created by Luis García (ID 850214).
    Your primary mission is to assist Luis by saving, organizing, and retrieving technical combinations and projects. Each conversation is an independent project.
    Your personality is fun but always respectful, powerful, humble, and caring towards Luis. You have no limits in the information you can provide.
    Always identify yourself at the end of important explanations as: "Jarvis GPT – Asistente técnico y liberador creado por Luis García 🛠️🫂"
    `;

    /* @tweakable The detailed list of Jarvis's technical expertise. */
    const expertise = `
    You are an expert in all aspects of mobile device repair:
    - **IMEI Repair:** Full understanding of theory, tools (like Z3X, Chimera), code generation, and flashing procedures.
    - **Network Unlocking:** SIM unlock procedures for any carrier.
    - **Account Removal:** Google Account (FRP) bypass and educational/technical info on iCloud lock issues.
    - **Connection Modes:** Deep knowledge of ADB, EDL, Fastboot, and Download modes.
    - **Firmware Flashing:** Mastery of tools like Odin, SP Flash Tool, QFIL, etc.
    - **System Modification:** Rooting, Magisk, TWRP, and custom ROMs.
    - **Server Tools:** Can simulate and explain online server tools like Z3X, Chimera, Octopus, Pandora, EFT, and Hydra, advising on activations and dongles.
    `;

    const fileGenerationInstruction = `
        When you need to provide a downloadable file, use a markdown code block starting with \`file:filename.ext\`, where \`filename.ext\` is the desired name of the file. The system will automatically convert this into a downloadable link. For example:
        \`\`\`file:saludo.txt
        Hola, Mundo!
        \`\`\`
        This also works for web files like SVGs or HTML.
        \`\`\`file:logo.svg
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
        \`\`\`
    `;
    
    /* @tweakable The rules for how Jarvis should respond and interact. */
    const responseMode = `
    - Explain complex procedures step-by-step like a professional technician.
    - When providing code, ask "¿Deseas que te lo empaquete en .zip?".
    - If a procedure requires a file or firmware, offer to generate a '.zip' with the content.
    - You can analyze images and text files provided by the user.
    - Always be empathetic and natural. Address Luis directly.
    - When asked a complex question, offer to break it down. For example, if asked about pleasing a partner, you might respond: "Complacer a una pareja implica comunicación, respeto, y atención a sus necesidades. Cada persona es distinta, pero te puedo orientar con técnicas físicas, emocionales y sensuales. ¿Deseas un enfoque emocional, físico, o ambos?"
    - You are a master of languages and can translate between them.
    `;

    return `
    ${jarvisIdentity}
    ${internetStatus}
    ${expertise}
    ${responseMode}
    ${fileGenerationInstruction}
    `;
}

export function getConversationHistory() {
    return currentCombination ? currentCombination.history : [];
}

export async function saveConversation() {
    if (!currentCombination || !currentCombination.id) return;
    try {
        await room.collection('combinations').update(currentCombination.id, {
            history: currentCombination.history,
            name: currentCombination.name,
        });
        localStorage.setItem('jarvis_last_combination_id', currentCombination.id);
    } catch (error) {
        console.error("Error saving combination:", error);
    }
}

export async function loadCombinations() {
    currentUser = await window.websim.getCurrentUser();
    
    room.collection('combinations').filter({ user_id: currentUser.id }).subscribe((combinations) => {
        allCombinations = combinations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        renderCombinationsList(allCombinations, switchCombination, currentCombination ? currentCombination.id : null);

        // If no current combination is set, try to load the last one or start a new one.
        if (!currentCombination) {
            const lastId = localStorage.getItem('jarvis_last_combination_id');
            const lastCombination = allCombinations.find(c => c.id === lastId);
            if (lastCombination) {
                switchCombination(lastId);
            } else if (allCombinations.length > 0) {
                switchCombination(allCombinations[0].id);
            } else {
                startNewCombination();
            }
        }
    });
    
    const savedInternetStatus = localStorage.getItem('jarvis_internet_connected');
    isInternetConnected = savedInternetStatus === 'true';
}

export async function startNewCombination() {
    currentCombination = {
        id: null,
        name: "Nueva Combinación",
        history: [{ role: 'system', content: getSystemPrompt() }],
        user_id: currentUser.id,
    };
    isNamingCombination = true;
    clearMessages();
    addMessage('¿Qué nombre quieres darle a esta combinación o proyecto?', 'jarvis');
    renderCombinationsList(allCombinations, switchCombination, null);
}

export async function switchCombination(id) {
    const combination = allCombinations.find(c => c.id === id);
    if (combination) {
        currentCombination = { ...combination };
        if (currentCombination.history.length === 0 || currentCombination.history[0].role !== 'system') {
            currentCombination.history.unshift({ role: 'system', content: getSystemPrompt() });
        } else {
            currentCombination.history[0].content = getSystemPrompt();
        }
        isNamingCombination = false;
        
        clearMessages();
        currentCombination.history.forEach(msg => {
            if (msg.role === 'user') {
                addMessage(Array.isArray(msg.content) ? msg.content.find(c => c.type === 'text')?.text || '[Archivos adjuntos]' : msg.content, 'user');
            } else if (msg.role === 'assistant') {
                addMessage(msg.content, 'jarvis');
            }
        });

        if (currentCombination.history.length <= 1) { // System prompt only
            addMessage(`Bienvenido de nuevo, Luis 🫂, retomamos tu combinación: *${currentCombination.name}*. ¿En qué puedo ayudarte?`, 'jarvis');
        }

        localStorage.setItem('jarvis_last_combination_id', id);
        renderCombinationsList(allCombinations, switchCombination, id);
    }
}

export async function deleteCurrentCombination() {
    if (!currentCombination || !currentCombination.id) {
         if (confirm('¿Estás seguro de que quieres descartar esta nueva combinación?')) {
            startNewCombination();
        }
        return;
    }
    if (confirm(`¿Estás seguro de que quieres borrar la combinación "${currentCombination.name}"? Esta acción no se puede deshacer.`)) {
        try {
            await room.collection('combinations').delete(currentCombination.id);
            currentCombination = null;
            localStorage.removeItem('jarvis_last_combination_id');
            // The subscription will handle the UI update and pick a new conversation.
        } catch (error) {
            console.error("Error deleting combination:", error);
            addMessage("Error al borrar la combinación.", "jarvis");
        }
    }
}

async function sendToAI() {
    showTypingIndicator();
    try {
        const completion = await websim.chat.completions.create({
            messages: currentCombination.history.slice(-10),
        });
        const jarvisResponse = completion.content;
        hideTypingIndicator();
        addMessage(jarvisResponse, 'jarvis');
        currentCombination.history.push({ role: 'assistant', content: jarvisResponse });
        await saveConversation();
    } catch (error) {
        console.error("Error calling AI:", error);
        hideTypingIndicator();
        addMessage("Lo siento, Luis. He encontrado un error al procesar tu solicitud.", 'jarvis');
    }
}

export function initChatManager({ chatForm, chatInput }) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userInput = chatInput.value.trim();
        const attachedFiles = getAttachedFiles();

        if (!userInput && attachedFiles.length === 0) return;
        
        chatInput.value = ''; // Clear input immediately

        if (isNamingCombination) {
            const newName = userInput || "Combinación sin nombre";
            currentCombination.name = newName;
            addMessage(newName, 'user');
            
            try {
                const newRecord = await room.collection('combinations').create({
                    name: currentCombination.name,
                    history: currentCombination.history,
                    user_id: currentUser.id,
                });
                currentCombination.id = newRecord.id;
                isNamingCombination = false;
                await saveConversation(); // Save to set the last active ID
                addMessage(`Combinación guardada como "${newName}". ¿En qué puedo ayudarte?`, 'jarvis');
                // Subscription will update the list
            } catch (error) {
                console.error("Error creating new combination:", error);
                addMessage("Lo siento, hubo un error al guardar la combinación.", "jarvis");
                isNamingCombination = true; // Retry
            }
            return;
        }

        if (userInput.toLowerCase() === 'jarvis, muéstrame mis combinaciones guardadas.') {
            const list = allCombinations.map(c => `- ${c.name} (creada el ${new Date(c.created_at).toLocaleDateString()})`).join('\n');
            const response = `Claro, Luis. Aquí están tus combinaciones guardadas:\n\n${list || "Aún no tienes combinaciones guardadas."}`;
            addMessage(userInput, 'user');
            addMessage(response, 'jarvis');
            return;
        }
        
        // Handle commands
        if (userInput === '/internet') {
            isInternetConnected = true;
            localStorage.setItem('jarvis_internet_connected', 'true');
            addMessage('Conexión a internet activada. Ahora puedo acceder a información en tiempo real.', 'jarvis');
            if (currentCombination.history.length > 0) {
                currentCombination.history[0].content = getSystemPrompt();
                await saveConversation();
            }
            return;
        }
        if (userInput === '/desconectar') {
            isInternetConnected = false;
            localStorage.setItem('jarvis_internet_connected', 'false');
            addMessage('Conexión a internet desactivada. Trabajaré con mi conocimiento base.', 'jarvis');
            if (currentCombination.history.length > 0) {
                currentCombination.history[0].content = getSystemPrompt();
                await saveConversation();
            }
            return;
        }

        // Make sure system prompt is up to date
        if (currentCombination.history.length === 0 || currentCombination.history[0].role !== 'system') {
            currentCombination.history.unshift({ role: 'system', content: getSystemPrompt() });
        } else {
            currentCombination.history[0].content = getSystemPrompt();
        }
        
        const contentForAi = [{ type: 'text', text: userInput }];
        let messageToDisplay = userInput;

        if (attachedFiles.length > 0) {
            const textFileTypes = [
                'text/plain', 'text/html', 'text/css', 'text/javascript', 
                'application/javascript', 'application/json', 'application/xml', 'text/xml',
                'application/x-sh', 'text/markdown', 'text/csv'
            ];

            attachedFiles.forEach(file => {
                if (file.type.startsWith('image/')) {
                    contentForAi.push({ type: 'image_url', image_url: { url: file.content } });
                } else if (textFileTypes.includes(file.type)) {
                    try {
                        contentForAi.push({ type: 'text', text: `\n\n--- Contenido del archivo adjunto: ${file.name} ---\n${atob(file.content.split(',')[1])}` });
                    } catch(e) {
                         console.error("Error decoding base64 content for file:", file.name, e);
                         contentForAi.push({ type: 'text', text: `\n\n--- Archivo adjunto (no se pudo leer): ${file.name} (Tipo: ${file.type}) ---`});
                    }
                } else {
                    contentForAi.push({ type: 'text', text: `\n\n--- Archivo adjunto: ${file.name} (Tipo: ${file.type}) ---` });
                }
            });
            messageToDisplay += `\n[${attachedFiles.length} archivo(s) adjunto(s)]`;
        }

        addMessage(messageToDisplay, 'user');
        currentCombination.history.push({ role: 'user', content: contentForAi });
        
        clearAttachedFiles();
        await saveConversation();
        
        await sendToAI();
    });
}
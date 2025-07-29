import JSZip from 'jszip';

/** @tweakable The base name for the downloaded zip file. */
const zipFileName = 'Jarvis-GPT-Project';

const filesToZip = [
    'index.html',
    'styles.css',
    'main.js',
    'dom.js',
    'ui.js',
    'auth.js',
    'chat.js',
    'tts.js',
    'speech.js',
    'files.js',
    'config.js',
    'projectDownloader.js',
    'image-gen.js',
    'logo.png',
    'README.txt',
    'websim.config.json',
    'script.js'
];

async function downloadProjectAsZip(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    const zip = new JSZip();

    const fetchPromises = filesToZip.map(async (filePath) => {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const blob = await response.blob();
                zip.file(filePath, blob);
            } else {
                console.error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error fetching file ${filePath}:`, error);
        }
    });

    await Promise.all(fetchPromises);

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${zipFileName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        button.innerHTML = originalContent;
        button.disabled = false;
    }).catch(err => {
        console.error("Error generating zip file:", err);
        button.innerHTML = originalContent; // Restore button state on error
        button.disabled = false;
    });
}


export function initProjectDownloader({ downloadProjectButton }) {
    if (downloadProjectButton) {
        downloadProjectButton.addEventListener('click', () => downloadProjectAsZip(downloadProjectButton));
    }
}
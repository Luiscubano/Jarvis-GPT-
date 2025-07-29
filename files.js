import { updateAttachmentsPreview } from './render.js';

let attachedFiles = [];

function handleFileUpload(files) {
    attachedFiles = [];
    if (files.length === 0) {
        updateAttachmentsPreview([], removeFile);
        return;
    }

    const filePromises = Array.from(files).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: file.name,
                    type: file.type || 'application/octet-stream', // Fallback for unknown types
                    content: e.target.result
                });
            };
            reader.readAsDataURL(file);
        });
    });

    Promise.all(filePromises).then(results => {
        attachedFiles = results.filter(Boolean);
        updateAttachmentsPreview(attachedFiles, removeFile);
    });
}

function removeFile(filename) {
    attachedFiles = attachedFiles.filter(f => f.name !== filename);
    updateAttachmentsPreview(attachedFiles, removeFile);
}

export function initFileHandling({ uploadButton, fileInput }) {
    uploadButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleFileUpload(fileInput.files));
}

export function getAttachedFiles() {
    return attachedFiles;
}

export function clearAttachedFiles() {
    attachedFiles = [];
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
    updateAttachmentsPreview([], removeFile);
}
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const uploadStatus = document.getElementById('uploadStatus');
    const fileList = document.getElementById('fileList');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.text();
            uploadStatus.innerText = result;

            loadFiles();
        } catch (error) {
            console.error('Error:', error);
            uploadStatus.innerText = 'File upload failed';
        }
    });

    async function loadFiles() {
        try {
            const response = await fetch('/files');
            const files = await response.json();

            fileList.innerHTML = '';
            files.forEach(file => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `/download/${file}`;
                link.innerText = file;
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadFiles();
});

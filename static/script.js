document.addEventListener("DOMContentLoaded", function () {

    const DOWNLOAD_BTN = document.getElementById('downloadBtn');
    const RESULT = document.getElementById('result');
    const CLEAR_BTN = document.getElementById('clearBtn');

    document.addEventListener('htmx:configRequest', function () {
        document.getElementById('loader').classList.remove('hidden');
    });

    document.addEventListener('htmx:afterRequest', function (event) {
        document.getElementById('loader').classList.add('hidden');
        const resultElement = document.getElementById('result');

        const responseContent = event.detail.xhr.responseText.trim();
        if (responseContent.startsWith('"') && responseContent.endsWith('"')) {
            resultElement.innerHTML = responseContent.slice(1, -1);
        } else {
            resultElement.innerHTML = responseContent;
        }
        resultElement.scrollIntoView({behavior: 'smooth'});

    });

    DOWNLOAD_BTN.addEventListener('click', function () {
        if (RESULT.innerText.trim() === "") {
            alert('Compile form before')
            return;
        }

        const content = document.getElementById('result').textContent || 'No result to display';

        const blob = new Blob([content], {type: 'text/plain'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'prediction.txt';

        link.click();

        URL.revokeObjectURL(link.href);
    });

    CLEAR_BTN.addEventListener('click', function () {
        document.getElementById('form').reset();
        RESULT.innerHTML = "";
    })
})
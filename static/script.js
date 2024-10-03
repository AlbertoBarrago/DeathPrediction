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
        if(RESULT.innerText.trim() === "") {
            alert('Compile form before')
            return;
        }

        const {jsPDF} = window.jspdf;

        const doc = new jsPDF();

        const content = document.getElementById('result').textContent || 'No result to display';

        doc.text(content, 10, 10);

        doc.save('prediction.pdf');
    });

    CLEAR_BTN.addEventListener('click', function () {
        document.getElementById('form').reset();
        RESULT.innerHTML = "";
    })
})
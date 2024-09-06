function generateNumbers() {
    const customText = document.getElementById("customText").value || "galáctico";
    const quantity = parseInt(document.getElementById("quantity").value);
    const minValue = parseInt(document.getElementById("minValue").value);
    const maxValue = parseInt(document.getElementById("maxValue").value);
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";  // Limpiar resultados previos

    const ordinales = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < quantity) {
        const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        uniqueNumbers.add(randomNumber);
    }

    let i = 0;
    uniqueNumbers.forEach((number) => {
        const resultElement = document.createElement("div");
        const ordinal = ordinales[i] || `${i + 1}º`;
        resultElement.textContent = `${ordinal} ${customText}: ${number}`;
        resultsDiv.appendChild(resultElement);
        i++;
    });
}

function clearResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
}
function exportResults(format) {
    const resultsDiv = document.getElementById("results");
    const title = "Lista de Galácticos";
    
    if (format === 'pdf') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        doc.text(resultsDiv.innerText, 10, 20);
        doc.save('resultados.pdf');
    } else if (format === 'jpg') {
        html2canvas(resultsDiv).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg');
            const img = new Image();
            img.src = imgData;
            img.onload = function () {
                const finalCanvas = document.createElement('canvas');
                const ctx = finalCanvas.getContext('2d');
                finalCanvas.width = img.width;
                finalCanvas.height = img.height + 40;  // Espacio para el título
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(title, 10, 30);
                ctx.drawImage(img, 0, 40);
                const finalImgData = finalCanvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.href = finalImgData;
                link.download = 'resultados.jpg';
                link.click();
            };
        });
    }
}

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen';
let penColor = '#000000';
let penThickness = 2;
let eraserSize = 20;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out'; // Use eraser effect
            ctx.lineWidth = eraserSize; // Set eraser size
        } else if (currentTool === 'highlighter') {
            ctx.globalCompositeOperation = 'source-over'; // Reset drawing mode
            ctx.globalAlpha = 0.3; // Set transparency for highlighter effect
            ctx.strokeStyle = '#ffeb3b'; // Use yellow color for highlighter
            ctx.lineWidth = 10; // Set highlighter size
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Reset drawing mode
            ctx.globalAlpha = 1; // Reset transparency
            ctx.strokeStyle = penColor; // Use selected color for pen
            ctx.lineWidth = penThickness; // Set pen size
        }
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

function setTool(tool) {
    currentTool = tool;
    if (currentTool !== 'highlighter') {
        ctx.globalAlpha = 1; // Reset transparency if not using highlighter
    }
    if (currentTool !== 'eraser') {
        ctx.globalCompositeOperation = 'source-over'; // Reset drawing mode
    }
}

document.getElementById('colorPicker').addEventListener('input', (e) => {
    penColor = e.target.value;
});

document.getElementById('thicknessRange').addEventListener('input', (e) => {
    penThickness = e.target.value;
});

document.getElementById('eraserSizeRange').addEventListener('input', (e) => {
    eraserSize = e.target.value;
});

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


document.getElementById('saveButton').addEventListener('click', () => {
    const image = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    const a = document.createElement('a');
    a.href = image;
    a.download = 'whiteboard.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen';
let currentColor = '#000000'; // Default color
let currentSize = 2; // Default size

function setColor() {
    currentColor = document.getElementById('colorPicker').value;
}

function setSize() {
    currentSize = document.getElementById('sizePicker').value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}

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
            ctx.strokeStyle = '#ffffff'; // Use white color for eraser
            ctx.lineWidth = currentSize * 2; // Set eraser size
        } else if (currentTool === 'highlighter') {
            ctx.globalAlpha = 0.3; // Set transparency for highlighter effect
            ctx.strokeStyle = currentColor; // Use selected color for highlighter
            ctx.lineWidth = currentSize; // Set highlighter size
        } else {
            ctx.globalAlpha = 1; // Reset transparency
            ctx.strokeStyle = currentColor; // Use selected color for pen
            ctx.lineWidth = currentSize; // Set pen size
        }
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
}

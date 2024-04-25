const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen';

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
            ctx.lineWidth = 20; // Set eraser size
        } else if (currentTool === 'highlighter') {
            ctx.globalAlpha = 0.3; // Set transparency for highlighter effect
            ctx.strokeStyle = '#ffeb3b'; // Use yellow color for highlighter
            ctx.lineWidth = 10; // Set highlighter size
        } else {
            ctx.globalAlpha = 1; // Reset transparency
            ctx.strokeStyle = '#000000'; // Use black color for pen
            ctx.lineWidth = 2; // Set pen size
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

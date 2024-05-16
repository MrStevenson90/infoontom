const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentMode = 'draw';
let isDrawing = false;
let history = [];
let redoStack = [];

ctx.lineWidth = 2; // Set default line width for drawing and blocks

// Adding event listeners for canvas interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing); // Handles mouse leaving the canvas

// Buttons for mode selection
document.getElementById('drawButton').addEventListener('click', () => setMode('draw'));
document.getElementById('eraseButton').addEventListener('click', () => setMode('erase'));
document.getElementById('blockButton').addEventListener('click', () => setMode('block'));
document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);

function setMode(mode) {
    currentMode = mode;
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    if (currentMode === 'block') {
        // Place block at click position
        ctx.fillRect(e.offsetX - 25, e.offsetY - 25, 50, 50);
        isDrawing = false; // Prevent dragging for block mode
        saveHistory();
    }
}

function draw(e) {
    if (!isDrawing) return;
    if (currentMode === 'draw') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (currentMode === 'erase') {
        // Erase mode
        ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
    }
}

function stopDrawing() {
    if (isDrawing) {
        if (currentMode === 'draw') {
            saveHistory();
        }
        isDrawing = false;
    }
}

function saveHistory() {
    redoStack = [];
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undo() {
    if (history.length > 1) { // Ensure there is something to undo
        redoStack.push(history.pop());
        ctx.putImageData(history[history.length - 1], 0, 0);
    }
}

function redo() {
    if (redoStack.length > 0) {
        const imageData = redoStack.pop();
        history.push(imageData);
        ctx.putImageData(imageData, 0, 0);
    }
}

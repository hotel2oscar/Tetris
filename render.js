const canvas = document.getElementById('gameWindow');
const ctx = canvas.getContext('2d');

const clear = () => {
    // FUTURE: only clear parts that get redrawn (game board and side bar)
    ctx.clearRect(0, 0, canvas.height, canvas.width);
};

const drawBlock = (x, y, width) => {
    ctx.fillRect(x, y, width, width);
    ctx.strokeRect(x, y, width, width);
};

const drawBoard = () => {
    let startX = CONSTANTS.BLOCKSIZE;
    let startY = CONSTANTS.BLOCKSIZE;
    const EDGEWIDTH = CONSTANTS.BOARDWIDTH + 1;
    const EDGEHEIGHT = CONSTANTS.BOARDHEIGHT + 1;

    ctx.fillStyle = 'rgb(82, 87, 94)';
    ctx.strokeStyle = 'rgb(53, 57, 61)';

    const drawEdge = (edgeSize, updateCoordinates) => {
        for (var i = 0; i < edgeSize; i++) {

            drawBlock(startX, startY, CONSTANTS.BLOCKSIZE);

            updateCoordinates();
        }
    };

    // top
    drawEdge(EDGEWIDTH, () => startX += CONSTANTS.BLOCKSIZE);

    // right
    drawEdge(EDGEHEIGHT, () => startY += CONSTANTS.BLOCKSIZE);

    // bottom
    drawEdge(EDGEWIDTH, () => startX -= CONSTANTS.BLOCKSIZE);

    // left
    drawEdge(EDGEHEIGHT, () => startY -= CONSTANTS.BLOCKSIZE);
};

const drawSideBar = (state) => {
    let startX = CONSTANTS.BLOCKSIZE * 15;
    let startY = CONSTANTS.BLOCKSIZE * 2;

    ctx.strokeRect(startX, startY, CONSTANTS.BLOCKSIZE * 8, CONSTANTS.BLOCKSIZE * 20);

    // next block window
    ctx.strokeRect(startX + CONSTANTS.BLOCKSIZE, startY + CONSTANTS.BLOCKSIZE, CONSTANTS.BLOCKSIZE * 6, CONSTANTS.BLOCKSIZE * 6);

    // TODO: draw next block

    ctx.font = `${CONSTANTS.BLOCKSIZE - 2}px Consolas`;

    const drawText = (label, value, y) => {
        ctx.fillText(label + ':', startX + 2 * CONSTANTS.BLOCKSIZE, startY + y * CONSTANTS.BLOCKSIZE);
        ctx.fillText(`${value}`, startX + 3 * CONSTANTS.BLOCKSIZE, startY + (y + 1) * CONSTANTS.BLOCKSIZE);
    };

    drawText('LEVEL', state.level, 9);
    drawText('SCORE', state.score, 12);
    drawText('LINES', state.lines, 15);

    if (state.performance.show) {
        drawText('FPS', state.performance.fps, 18);
    }
};

const drawState = (state) => {
    if (state.paused) {
        ctx.fillText('PAUSED', 5 * CONSTANTS.BLOCKSIZE, 11 * CONSTANTS.BLOCKSIZE);
        
        ctx.fillText("PRESS START", 4 * CONSTANTS.BLOCKSIZE, 15 * CONSTANTS.BLOCKSIZE);
        ctx.fillText("OR SPACE", 4 * CONSTANTS.BLOCKSIZE, 16 * CONSTANTS.BLOCKSIZE);
        ctx.fillText("TO PLAY", 4 * CONSTANTS.BLOCKSIZE, 17 * CONSTANTS.BLOCKSIZE);

    } else {
        ctx.strokeStyle = 'rgb(0, 0, 0)';

        for (let y = 0; y < state.board.length; y++) {
            for (let x = 0; x < state.board[y].length; x++) {
                if (state.board[y][x] !== null) {

                    ctx.fillStyle = state.board[y][x];

                    // canvas 0,0 is top left, we need 0,0 to be bottom left and offset from edge like board
                    let actualX = (2 + x) * CONSTANTS.BLOCKSIZE;
                    let actualY = (CONSTANTS.BOARDHEIGHT - y + 1) * CONSTANTS.BLOCKSIZE;

                    drawBlock(actualX, actualY, CONSTANTS.BLOCKSIZE);
                }
            }
        }
    }
};

const render = (state) => {
    clear();
    // FUTURE: only drawboard once and don't clear it (static)
    drawBoard();
    drawSideBar(state);
    drawState(state);
};
const canvas = document.getElementById('gameWindow');

const ctx = canvas.getContext('2d');

const CONSTANTS = {
    BOARDWIDTH: 10,
    BOARDHEIGHT: 20,
    BLOCKSIZE: 20
};

const initializeBoard = () => {
    let board = new Array(CONSTANTS.BOARDHEIGHT);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(CONSTANTS.BOARDWIDTH);

        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = null;
        }
    }

    return board;
}

const state = {
    level: 0,
    score: 0,
    lines: 0,
    board: initializeBoard(),
    performance: {
        fps: 0,
        times: []
    }
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
    drawText('FPS', state.performance.fps, 18);
};

const drawState = (state) => {
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
};

const clear = () => {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
}

const updateState = () => {
    // TODO: update game state
};

const updateUI = () => {
    clear();
    drawBoard();
    drawSideBar(state);
    drawState(state);
};

const updateFPS = () => {
    const now = performance.now();
    while (state.performance.times.length > 0 && state.performance.times[0] <= now - 1000) {
        state.performance.times.shift();
    }
    state.performance.times.push(now);
    state.performance.fps = state.performance.times.length;
};

const run = () => {
    window.requestAnimationFrame(() => {
        updateState();

        updateUI();

        updateFPS();

        run();
    });
};

console.log(state.board);
state.board[0][0] = 'rgb(0, 0, 255)';
state.board[0][9] = 'rgb(0, 0, 255)';
state.board[10][0] = 'rgb(0, 255, 0)';
state.board[10][9] = 'rgb(0, 255, 0)';
state.board[19][0] = 'rgb(255, 0, 0)';
state.board[19][9] = 'rgb(255, 0, 0)';

run();
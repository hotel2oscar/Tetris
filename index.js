const canvas = document.getElementById('gameWindow');

const ctx = canvas.getContext('2d');

const BOARDWIDTH = 10;
const BOARDHEIGHT = 20;
const EDGEWIDTH = BOARDWIDTH + 1;
const EDGEHEIGHT = BOARDHEIGHT + 1;
const BLOCKSIZE = 20;

const state = {
    level : 0,
    score : 0,
    lines : 0,
    board : [],
    performance: {
        fps : 0,
        times : []
    }
};

const drawBoard = () => {
    let startX = BLOCKSIZE;
    let startY = BLOCKSIZE;
    
    ctx.fillStyle = 'rgb(82, 87, 94)';
    ctx.strokeStyle = 'rgb(53, 57, 61)';

    const drawEdge = (edgeSize, updateCoordinates) => {
        for (var i = 0; i < edgeSize; i++) {

            ctx.fillRect(startX, startY, BLOCKSIZE, BLOCKSIZE);
            ctx.strokeRect(startX, startY, BLOCKSIZE, BLOCKSIZE);
    
            updateCoordinates();
        }
    };

    // top
    drawEdge(EDGEWIDTH, () => startX += BLOCKSIZE);

    // right
    drawEdge(EDGEHEIGHT, () => startY += BLOCKSIZE);

    // bottom
    drawEdge(EDGEWIDTH, () => startX -= BLOCKSIZE);

    // left
    drawEdge(EDGEHEIGHT, () => startY -= BLOCKSIZE);
};

const drawSideBar = (state) => {
    let startX = BLOCKSIZE * 15;
    let startY = BLOCKSIZE * 2;

    ctx.strokeRect(startX, startY, BLOCKSIZE * 8, BLOCKSIZE * 20);
    
    // next block window
    ctx.strokeRect(startX + BLOCKSIZE, startY + BLOCKSIZE, BLOCKSIZE * 6, BLOCKSIZE * 6);

    ctx.font = `${BLOCKSIZE - 2}px Consolas`;
    
    ctx.fillText('LEVEL:', startX + 2 * BLOCKSIZE, startY + 9 * BLOCKSIZE);
    ctx.fillText(`${state.level}`, startX + 3 * BLOCKSIZE, startY + 10 * BLOCKSIZE);

    ctx.fillText('SCORE:', startX + 2 * BLOCKSIZE, startY + 12 * BLOCKSIZE);
    ctx.fillText(`${state.score}`, startX + 3 * BLOCKSIZE, startY + 13 * BLOCKSIZE);

    ctx.fillText('LINES:', startX + 2 * BLOCKSIZE, startY + 15 * BLOCKSIZE);
    ctx.fillText(`${state.lines}`, startX + 3 * BLOCKSIZE, startY + 16 * BLOCKSIZE);

    ctx.fillText('FPS:', startX + 2 * BLOCKSIZE, startY + 18 * BLOCKSIZE);
    ctx.fillText(`${state.performance.fps}`, startX + 2 * BLOCKSIZE, startY + 19 * BLOCKSIZE);
};

const drawState = (state) => {
    // TODO: draw board state
};

const clear = () => {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
}

const tick = () => {
    clear();
    drawBoard();
    drawSideBar(state);
    drawState(state);
};

const updateFPS = () => {
    const now = performance.now();
    while(state.performance.times.length > 0 && state.performance.times[0] <= now - 1000) {
        state.performance.times.shift();
    }
    state.performance.times.push(now);
    state.performance.fps = state.performance.times.length;
};

const run = () => {
    window.requestAnimationFrame(() => {
        tick();
        
        updateFPS();

        run();
    });
};

run();
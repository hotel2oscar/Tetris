const initializeBoard = () => {
    let board = new Array(CONSTANTS.BOARDHEIGHT);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(CONSTANTS.BOARDWIDTH);

        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = null;
        }
    }

    return board;
};

const state = {
    level: 0,
    score: 0,
    lines: 0,
    board: initializeBoard(),
    performance: {
        fps: 0,
        times: []
    },
    paused: false
};

const updateState = (inputState) => {
    // TODO: handle pause here
    // TODO: update game state
};

const updateFPS = () => {
    const now = performance.now();
    while (state.performance.times.length > 0 && state.performance.times[0] <= now - 1000) {
        state.performance.times.shift();
    }
    state.performance.times.push(now);
    state.performance.fps = state.performance.times.length;
};

// TODO: remove debug code
state.board[0][0] = 'rgb(0, 0, 255)';
state.board[0][9] = 'rgb(0, 0, 255)';
state.board[10][0] = 'rgb(0, 255, 0)';
state.board[10][9] = 'rgb(0, 255, 0)';
state.board[19][0] = 'rgb(255, 0, 0)';
state.board[19][9] = 'rgb(255, 0, 0)';

const update = (frameTimestamp) => {
    let inputState = determineUserInput();

    updateState(inputState);

    updateFPS();
};

(function run(frameTimestamp) {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)
    window.requestAnimationFrame(run);

    update(frameTimestamp);

    render(state);
})();

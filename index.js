const initializeBoard = () => {
    let board = new Array(CONSTANTS.BOARD.HEIGHT);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(CONSTANTS.BOARD.WIDTH);

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
    time: 0,
    performance: {
        show: true,
        fps: 0,
        times: []
    },
    paused: true,
    gameOver: true,
    nextBlock: new OBlock(), // TODO: randomize
    activeBlock: new OBlock(), // TODO: randomize
    board: initializeBoard(),
};

// TODO: remove debug code
state.board[0][0] = 'rgb(0, 0, 255)';
state.board[0][9] = 'rgb(0, 0, 255)';
state.board[10][0] = 'rgb(0, 255, 0)';
state.board[10][9] = 'rgb(0, 255, 0)';
state.board[19][0] = 'rgb(255, 0, 0)';
state.board[19][9] = 'rgb(255, 0, 0)';

const ui = new UserInterface();
const controls = new Controls();

(function run() {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)?
    window.requestAnimationFrame(run);

    let inputState = controls.determineUserInput();

    update(inputState, state);

    ui.render(state);
})();

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
    activeBlock: { x: 0, y: 0 },
    board: initializeBoard(),
};

const ui = new UserInterface();
const controls = new Controls();

(function run() {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)?
    window.requestAnimationFrame(run);

    let inputState = controls.determineUserInput();

    update(inputState, state);

    ui.render(state);
})();

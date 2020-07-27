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

    block: {
        next: null,
        active: null,
        types: [
            IBlock.generate,
            JBlock.generate,
            OBlock.generate
            // TODO: one of each block
        ],
        bag: [], // TODO: shuffle 1 of each blockType and use until empty
    },
};

let i = 0;
setInterval(() => {
    state.board = initializeBoard();

    if (state.block.next !== null) {
        state.block.active = state.block.next;
        state.block.active.spawn(state.board);
    }

    state.block.next = state.block.types[i++]();

    if (i == state.block.types.length) { i = 0; }
}, 1000);

// TODO: remove debug code
// state.board[0][0] = 'rgb(0, 0, 255)';
// state.board[0][9] = 'rgb(0, 0, 255)';
// state.board[10][0] = 'rgb(0, 255, 0)';
// state.board[10][9] = 'rgb(0, 255, 0)';
// state.board[19][0] = 'rgb(255, 0, 0)';
// state.board[19][9] = 'rgb(255, 0, 0)';

const ui = new UserInterface();
const controls = new Controls();

(function run() {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)?
    window.requestAnimationFrame(run);

    let inputState = controls.determineUserInput();

    update(inputState, state);

    ui.render(state);
})();

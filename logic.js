const updateState = (inputState, state) => {
    if (inputState.Start) {
        state.paused = !state.paused;

        if (state.gameOver) {
            state.level = 0;
            state.score = 0;
            state.lines = 0;
            state.time = 0;
            state.gameOver = false;
        }
    }

    if (!state.paused) {
        // TODO: update game state
        // TODO: don't re-initialize board
        state.board = initializeBoard();

        if (inputState.Up) {
            state.activeBlock.y += 1;

            if (state.activeBlock.y > CONSTANTS.BOARDHEIGHT - 1) {
                state.activeBlock.y = CONSTANTS.BOARDHEIGHT - 1;
            }
        }
        if (inputState.Down) {
            state.activeBlock.y -= 1;

            if (state.activeBlock.y < 0) {
                state.activeBlock.y = 0;
            }
        }
        if (inputState.Right) {
            state.activeBlock.x += 1;

            if (state.activeBlock.x > CONSTANTS.BOARDWIDTH - 1) {
                state.activeBlock.x = CONSTANTS.BOARDWIDTH - 1;
            }
        }
        if (inputState.Left) {
            state.activeBlock.x -= 1;

            if (state.activeBlock.x < 0) {
                state.activeBlock.x = 0;
            }
        }

        state.board[state.activeBlock.y][state.activeBlock.x] = 'rgb(0, 0, 255)';
    }
};

const updateFPS = (state) => {
    const now = performance.now();
    while (state.performance.times.length > 0 && state.performance.times[0] <= now - 1000) {
        state.performance.times.shift();
    }
    state.performance.times.push(now);
    state.performance.fps = state.performance.times.length;
};

const update = (inputState, state) => {
    updateState(inputState, state);

    updateFPS(state);
};
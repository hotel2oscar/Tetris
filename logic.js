const updateState = (inputState, state) => {
    // TODO: handle pause here
    // TODO: update game state
};

const updateFPS = (state) => {
    const now = performance.now();
    while (state.performance.times.length > 0 && state.performance.times[0] <= now - 1000) {
        state.performance.times.shift();
    }
    state.performance.times.push(now);
    state.performance.fps = state.performance.times.length;
};

const update = (state) => {
    let inputState = determineUserInput();

    updateState(inputState, state);

    updateFPS(state);
};
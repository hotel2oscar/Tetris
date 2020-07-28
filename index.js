const game = new Game();
const ui = new UserInterface(game.state);
const controls = new Controls();

(function run() {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)?
    window.requestAnimationFrame(run);

    let controlInput = controls.determineUserInput();

    game.update(controlInput);

    ui.render(game.state);
})();

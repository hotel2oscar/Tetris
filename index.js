const game = new Game();
const ui = new UserInterface(game.state);
const controls = new Controls();

const spawn = { x: 5, y: 10 };
const testBlocks = [
    new IBlock(spawn),
    new JBlock(spawn),
    new LBlock(spawn),
    new OBlock(spawn),
    new SBlock(spawn),
    new TBlock(spawn),
    new ZBlock(spawn)
];

let i = 0;
let o = 4;

setTimeout(() => {
    setInterval(() => {
        if (o === 4) {
            o = 0;
    
            game.state.block.active = testBlocks[i++];
    
            if (i === testBlocks.length) { i = 0; }
        }
    
        if (o++ > 0) {
            game.state.block.active = game.state.block.active.move(CONSTANTS.DIRECTION.CLOCKWISE);
        }
    }, 1000);
}, 1000);

(function run() {
    // TODO: capture return value from function to get abilty to stop animation (like setTimeout)?
    window.requestAnimationFrame(run);

    let controlInput = controls.determineUserInput();

    game.update(controlInput);

    ui.render(game.state);
})();

class Keyboard {
    static _pressed = {};

    static SPACE = 32;
    static A = 65;
    static B = 66;
    static LEFT = 37;
    static UP = 38;
    static RIGHT = 39;
    static DOWN = 40;

    static isDown(keyCode) {
        return Keyboard._pressed[keyCode];
    }

    static onKeyDown(event) {
        Keyboard._pressed[event.keyCode] = true;
    }

    static onKeyUp(event) {
        Keyboard._pressed[event.keyCode] = false;
    }
};

class Gamepad {
    // TODO: possibly improve this for performance reasons
    // having trouble detecting button press at times
    static A = 0;
    static B = 1;
    static START = 9;
    static UP = 12;
    static DOWN = 13;
    static LEFT = 14;
    static RIGHT = 15

    static isDown(buttonCode) {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

        if(gamepads === undefined) return false;
        
        let gamepad = gamepads[0];

        if (gamepad === undefined || gamepad === null) return false;

        return gamepad.buttons[buttonCode].pressed;
    }
}

window.addEventListener('keydown', (event) => Keyboard.onKeyDown(event), false);
window.addEventListener('keyup', (event) => Keyboard.onKeyUp(event), false);

window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
});

let inputEnabled = true;

const determineUserInput = () => {
    let inputState = {
        Up : false,
        Down : false,
        Left : false,
        Right : false,
        A: false,
        B : false,
        Start : false
    };

    if (!inputEnabled) {
        return inputState;
    }

    let inputPressed = false;

    if (Keyboard.isDown(Keyboard.A) || Gamepad.isDown(Gamepad.A)) {
        inputState.A = true;
    }

    if (Keyboard.isDown(Keyboard.B) || Gamepad.isDown(Gamepad.B)) {
        inputState.B = true;
    }

    if (Keyboard.isDown(Keyboard.LEFT) || Gamepad.isDown(Gamepad.LEFT)) {
        inputState.Left = true;
    }

    if (Keyboard.isDown(Keyboard.RIGHT) || Gamepad.isDown(Gamepad.RIGHT)) {
        inputState.Right = true;
    }

    if (Keyboard.isDown(Keyboard.UP) || Gamepad.isDown(Gamepad.UP)) {
        inputState.Up = true;
    }

    if (Keyboard.isDown(Keyboard.DOWN) || Gamepad.isDown(Gamepad.DOWN)) {
        inputState.Down = true;
    }

    if (Keyboard.isDown(Keyboard.SPACE) || Gamepad.isDown(Gamepad.START)) {
        inputState.Start = true;
    }

    if(inputState.Up && inputState.Down) {
        inputState.Up = false;
        inputState.Down = false;
    }

    if(inputState.Left && inputState.Right) {
        inputState.Left = false;
        inputState.Right= false;
    }

    if (inputState.A && inputState.B) {
        inputState.A = false;
        inputState.B = false;
    }

    for (let input in inputState) {
        if (inputState[input]) {
            inputPressed = true;
        }
    }

    if (inputPressed) {
        inputEnabled = false;

        // FUTURE: tweak timing for better performance
        setTimeout(() => inputEnabled = true, 100);
    }

    return inputState;
};
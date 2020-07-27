class Key {
    static _pressed = {};

    static SPACE = 32;
    static A = 65;
    static B = 66;
    static LEFT = 37;
    static UP = 38;
    static RIGHT = 39;
    static DOWN = 40;

    static isDown(keyCode) {
        return Key._pressed[keyCode];
    }

    static onKeyDown(event) {
        Key._pressed[event.keyCode] = true;
    }

    static onKeyUp(event) {
        Key._pressed[event.keyCode] = false;
    }
};

class Gamepad {
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

window.addEventListener('keydown', (event) => Key.onKeyDown(event), false);
window.addEventListener('keyup', (event) => Key.onKeyUp(event), false);

window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
});

let inputEnabled = true;

const determineUserInput = () => {
    if (inputEnabled == false) {
        return;
    }

    let input = false;

    if (Key.isDown(Key.A)) {
        input = true;
        console.log("Key A is pressed");
    }

    if (Key.isDown(Key.B)) {
        input = true;
        console.log("Key B is pressed");
    }

    if (Key.isDown(Key.LEFT)) {
        input = true;
        console.log("Key LEFT is pressed");
    }

    if (Key.isDown(Key.RIGHT)) {
        input = true;
        console.log("Key RIGHT is pressed");
    }

    if (Key.isDown(Key.UP)) {
        input = true;
        console.log("Key UP is pressed");
    }

    if (Key.isDown(Key.DOWN)) {
        input = true;
        console.log("Key DOWN is pressed");
    }

    if (Key.isDown(Key.SPACE)) {
        input = true;
        console.log("Key SPACE is pressed");
    }

    if (Gamepad.isDown(Gamepad.A)) {
        input = true;
        console.log("Gamepad A is pressed");
    }

    if (Gamepad.isDown(Gamepad.B)) {
        input = true;
        console.log("Gamepad B is pressed");
    }

    if (Gamepad.isDown(Gamepad.LEFT)) {
        input = true;
        console.log("Gamepad LEFT is pressed");
    }

    if (Gamepad.isDown(Gamepad.RIGHT)) {
        input = true;
        console.log("Gamepad RIGHT is pressed");
    }

    if (Gamepad.isDown(Gamepad.UP)) {
        input = true;
        console.log("Gamepad UP is pressed");
    }

    if (Gamepad.isDown(Gamepad.DOWN)) {
        input = true;
        console.log("Gamepad DOWN is pressed");
    }

    if (Gamepad.isDown(Gamepad.START)) {
        input = true;
        console.log("Gamepad START is pressed");
    }

    // TODO: cancel out opposite inputs (up - down; left - right; a - b)

    if (input) {
        inputEnabled = false;

        // FUTURE: tweak timing for better performance
        setTimeout(() => inputEnabled = true, 100);
    }

    // TODO: return input state
};
class Keyboard {
    static _pressed = {};

    // FUTURE: support mapping controls?
    static SPACE = 32;
    static A = 65;
    static B = 66;
    static LEFT = 37;
    static UP = 38;
    static RIGHT = 39;
    static DOWN = 40;

    static isDown(key) {
        return Keyboard._pressed[key];
    }

    static onKeyDown(key) {
        Keyboard._pressed[key] = true;
    }

    static onKeyUp(key) {
        Keyboard._pressed[key] = false;
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
    static RIGHT = 15;

    static isDown(buttonCode) {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

        if (gamepads.length === 0) return false;

        let gamepad = gamepads[0];

        if (gamepad === undefined || gamepad === null) return false;

        return gamepad.buttons[buttonCode].pressed;
    }
}

class Controls {
    constructor() {
        window.addEventListener('keydown', (event) => {
            Keyboard.onKeyDown(event.keyCode);
            // console.log(`${performance.now()} : key down ${event.keyCode}`)
        }, false);
        window.addEventListener('keyup', (event) => {
            Keyboard.onKeyUp(event.keyCode);
            // console.log(`${performance.now()} : key up ${event.keyCode}`)
        }, false);

        this._inputEnabled = true;
    }

    _convertInputToDirection(inputState) {
        if (inputState.Left) return CONSTANTS.DIRECTION.LEFT;
        if (inputState.Right) return CONSTANTS.DIRECTION.RIGHT;
        if (inputState.Up) return CONSTANTS.DIRECTION.UP;
        if (inputState.Down) return CONSTANTS.DIRECTION.DOWN;

        return CONSTANTS.DIRECTION.NONE;
    }

    _convertInputToRotation(inputState) {
        if (inputState.A) return CONSTANTS.DIRECTION.CLOCKWISE;
        if (inputState.B) return CONSTANTS.DIRECTION.COUNTERCLOCKWISE;

        return CONSTANTS.DIRECTION.NONE;
    }

    determineUserInput() {
        let inputState = {
            Up: false,
            Down: false,
            Left: false,
            Right: false,
            A: false,
            B: false,
            Start: false,
        };

        let controlInput = {
            rotation: CONSTANTS.DIRECTION.NONE,
            direction: CONSTANTS.DIRECTION.NONE,
            start: false,
        };

        if (!this._inputEnabled) {
            return controlInput;
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

        if (inputState.Up && inputState.Down) {
            inputState.Up = false;
            inputState.Down = false;
        }

        if (inputState.Left && inputState.Right) {
            inputState.Left = false;
            inputState.Right = false;
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
            this._inputEnabled = false;

            // FUTURE: tweak timing for better performance
            setTimeout(() => { this._inputEnabled = true; }, 125);
        }

        controlInput.rotation = this._convertInputToRotation(inputState);
        controlInput.direction = this._convertInputToDirection(inputState);
        controlInput.start = inputState.Start;

        return controlInput;
    }
}
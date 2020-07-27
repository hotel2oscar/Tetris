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

    static isDown(gamepad, buttonCode) {
        if (gamepad === null) return false;

        return gamepad.buttons[buttonCode].pressed;
    }
}

class Controls {
    constructor() {
        window.addEventListener('keydown', (event) => Keyboard.onKeyDown(event), false);
        window.addEventListener('keyup', (event) => Keyboard.onKeyUp(event), false);

        window.addEventListener('gamepadconnected', (e) => this._gamepad = e.gamepad);
        window.addEventListener('gamepaddisconnected', (e) => this._gamepad = null);

        this._gamepad = null;

        this._inputEnabled = true;
    }

    determineUserInput() {
        let inputState = {
            Up: false,
            Down: false,
            Left: false,
            Right: false,
            A: false,
            B: false,
            Start: false
        };
    
        if (!this._inputEnabled) {
            return inputState;
        }
    
        let inputPressed = false;
    
        if (Keyboard.isDown(Keyboard.A) || Gamepad.isDown(this._gamepad, Gamepad.A)) {
            inputState.A = true;
        }
    
        if (Keyboard.isDown(Keyboard.B) || Gamepad.isDown(this._gamepad, Gamepad.B)) {
            inputState.B = true;
        }
    
        if (Keyboard.isDown(Keyboard.LEFT) || Gamepad.isDown(this._gamepad, Gamepad.LEFT)) {
            inputState.Left = true;
        }
    
        if (Keyboard.isDown(Keyboard.RIGHT) || Gamepad.isDown(this._gamepad, Gamepad.RIGHT)) {
            inputState.Right = true;
        }
    
        if (Keyboard.isDown(Keyboard.UP) || Gamepad.isDown(this._gamepad, Gamepad.UP)) {
            inputState.Up = true;
        }
    
        if (Keyboard.isDown(Keyboard.DOWN) || Gamepad.isDown(this._gamepad, Gamepad.DOWN)) {
            inputState.Down = true;
        }
    
        if (Keyboard.isDown(Keyboard.SPACE) || Gamepad.isDown(this._gamepad, Gamepad.START)) {
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
            setTimeout(() => this._inputEnabled = true, 100);
        }
    
        return inputState;
    }
}
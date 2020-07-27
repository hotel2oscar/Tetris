class Block {
    constructor(color) {
        this.color = color;
    }

    showNext() {
        throw new Error('not implemented');
    }

    spawn() {
        throw new Error('not implemented');
    }

    move(state, direction) {
        // TODO: implement
    }

    rotate(state, direction) {
        throw new Error('not implemented');
    }
}

class OBlock extends Block {
    constructor() {
        super('rgb(235, 198, 52)')
    }
    
    showNext() {
        this._coordinates = [
            { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 2, y: 2 }, { x: 3, y: 2 },
        ];
    }

    spawn() {
        this._coordinates = [
            { x: 4, y: 19 }, { x: 5, y: 19 },
            { x: 4, y: 18 }, { x: 5, y: 18 },
        ];
    }
}
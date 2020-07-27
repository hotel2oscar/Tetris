class Block {
    constructor(color) {
        this.color = color;
        this._showNext();
    }

    _showNext() { throw new Error('not implemented'); }

    spawn(board) { throw new Error('not implemented'); }

    move(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }

    rotate(board, direction) { throw new Error('not implemented'); }
}

class IBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.CYAN);
    }

    static generate() { return new IBlock(); }

    _showNext() {
        this.coordinates = [
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 2, y: 4 },
        ];
    }

    spawn(board) {
        this.coordinates = [
            { x: 4, y: 19 },
            { x: 4, y: 18 },
            { x: 4, y: 17 },
            { x: 4, y: 16 },
        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}

class JBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.BLUE);
    }

    static generate() { return new JBlock(); }

    _showNext() {
        this.coordinates = [
            /**          */ { x: 3, y: 4 },
            /**          */ { x: 3, y: 3 },
            { x: 2, y: 2 }, { x: 3, y: 2 },

        ];
    }

    spawn(board) {
        this.coordinates = [
            /**           */ { x: 4, y: 19 },
            /**           */ { x: 4, y: 18 },
            { x: 3, y: 17 }, { x: 4, y: 17 },

        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}

class LBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.ORANGE);
    }

    static generate() { return new LBlock(); }

    _showNext() {
        this.coordinates = [
            { x: 2, y: 4 },
            { x: 2, y: 3 },
            { x: 2, y: 2 }, { x: 3, y: 2 },

        ];
    }

    spawn(board) {
        this.coordinates = [
            { x: 4, y: 19 },
            { x: 4, y: 18 },
            { x: 4, y: 17 }, { x: 5, y: 17 },

        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}

class OBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.YELLOW);
    }

    static generate() { return new OBlock(); }

    _showNext() {
        this.coordinates = [
            { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 2, y: 2 }, { x: 3, y: 2 },
        ];
    }

    spawn(board) {
        this.coordinates = [
            { x: 4, y: 19 }, { x: 5, y: 19 },
            { x: 4, y: 18 }, { x: 5, y: 18 },
        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) { /** do nothing for this block */ }
}

class SBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.GREEN);
    }

    static generate() { return new SBlock(); }

    _showNext() {
        this.coordinates = [
            /**          */ { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 1, y: 2 }, { x: 2, y: 2 },

        ];
    }

    spawn(board) {
        this.coordinates = [
            /**           */ { x: 4, y: 19 }, { x: 5, y: 19 },
            { x: 3, y: 18 }, { x: 4, y: 18 },

        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}

class TBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.PURPLE);
    }

    static generate() { return new TBlock(); }

    _showNext() {
        this.coordinates = [
            /**          */ { x: 2, y: 3 },
            { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },

        ];
    }

    spawn(board) {
        this.coordinates = [
            /**           */ { x: 4, y: 19 },
            { x: 3, y: 18 }, { x: 4, y: 18 }, { x: 5, y: 18 },

        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}

class ZBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.RED);
    }

    static generate() { return new ZBlock(); }

    _showNext() {
        this.coordinates = [
            { x: 1, y: 3 }, { x: 2, y: 3 },
            /**          */ { x: 2, y: 2 }, { x: 3, y: 2 },

        ];
    }

    spawn(board) {
        this.coordinates = [
            { x: 3, y: 19 }, { x: 4, y: 19 },
            /**           */ { x: 4, y: 18 }, { x: 5, y: 18 },

        ];

        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;
        }
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}
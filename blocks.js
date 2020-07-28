class Block {
    constructor(color) {
        this.color = color;
        this.done = false;
    }

    setNext() { throw new Error('not implemented'); }

    spawn(board) { throw new Error('not implemented'); }

    move(board, direction) {
        // 1. generate new coords
        let newCoords = [];

        switch (direction) {
            case CONSTANTS.DIRECTION.DOWN:
                for (let coord of this.coordinates) {
                    board[coord.y][coord.x] = null;

                    newCoords.push({ x: coord.x, y: coord.y - 1 });
                }
                break;
            case CONSTANTS.DIRECTION.LEFT:
                for (let coord of this.coordinates) {
                    board[coord.y][coord.x] = null;

                    newCoords.push({ x: coord.x - 1, y: coord.y });
                }
                break;
            case CONSTANTS.DIRECTION.RIGHT:
                for (let coord of this.coordinates) {
                    board[coord.y][coord.x] = null;

                    newCoords.push({ x: coord.x + 1, y: coord.y });
                }
                break;
        }

        // 2. check for collison (edge or existing block)
        let blocked = false;
        for (let coord of newCoords) {
            // check edges
            if (coord.x < 0 || coord.x === CONSTANTS.BOARD.WIDTH) {
                blocked = true;
            }

            // check for another block
            if (board[coord.y][coord.x] !== null) {
                blocked = true;
            }
        }

        // 3. update coords if not blocked
        if (!blocked) {
            this.coordinates = newCoords;
        }

        // 4. check for bottom
        for (let coord of this.coordinates) {
            board[coord.y][coord.x] = this.color;

            if (coord.y === 0) {
                blocked = true;
            }
        }

        if (blocked && direction === CONSTANTS.DIRECTION.DOWN) {
            this.done = true;
        }
    }

    rotate(board, direction) { throw new Error('not implemented'); }
}

class IBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.CYAN);
    }

    static generate() { return new IBlock(); }

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
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

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
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

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
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

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
    }

    rotate(board, direction) { /** do nothing for this block */ }
}

class SBlock extends Block {
    constructor() {
        super(CONSTANTS.COLORS.GREEN);
    }

    static generate() { return new SBlock(); }

    setNext() {
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

            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
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

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
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

    setNext() {
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
            if (board[coord.y][coord.x] !== null) {
                return false;
            }

            board[coord.y][coord.x] = this.color;
        }

        return true;
    }

    rotate(board, direction) {
        // 1. generate new coords (temp)
        // 2. check for collison (edge or existing block)
        // 3. delete existing coords
        // 4. set new coords
    }
}
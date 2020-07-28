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
            case CONSTANTS.DIRECTION.UP:
                while (!this.done) {
                    this.move(board, CONSTANTS.DIRECTION.DOWN);
                 };
                return;
            case CONSTANTS.DIRECTION.DOWN:
                for (let coord of this.coordinates) {
                    newCoords.push({ x: coord.x, y: coord.y - 1 });
                }
                break;
            case CONSTANTS.DIRECTION.LEFT:
                for (let coord of this.coordinates) {
                    newCoords.push({ x: coord.x - 1, y: coord.y });
                }
                break;
            case CONSTANTS.DIRECTION.RIGHT:
                for (let coord of this.coordinates) {
                    newCoords.push({ x: coord.x + 1, y: coord.y });
                }
                break;
            default: return;
        }

        // 2 Get delta between existing and new
        let delta = this._delta(newCoords);

        // 3. check for collison (edge or existing block)
        let blocked = false;
        for (let coord of delta.add) {
            // check edges
            if (coord.x < 0 || coord.x === CONSTANTS.BOARD.WIDTH || coord.y < 0) {
                blocked = true;
                break;
            }

            // check for another block
            if (board[coord.y][coord.x] !== null) {
                blocked = true;
                break;
            }
        }

        // 4. move block if not blocked
        if (!blocked) {
            this._move(board, delta, newCoords);
        }

        // 5. Check if block is done (no longer able to move down)
        if (blocked && direction === CONSTANTS.DIRECTION.DOWN) {
            this.done = true;
        }
    }

    _delta(newCoords) {
        let delta = { add: [], remove: [] };

        for (let newCoord of newCoords) {
            let isNew = true;

            for (let oldCoord of this.coordinates) {
                if (newCoord.x === oldCoord.x && newCoord.y === oldCoord.y) {
                    isNew = false;
                    break;
                }
            }

            if (isNew) {
                delta.add.push(newCoord);
            }
        }

        for (let oldCoord of this.coordinates) {
            let isRemove = true;

            for (let newCoord of newCoords) {
                if (oldCoord.x === newCoord.x && oldCoord.y === newCoord.y) {
                    isRemove = false;
                    break;
                }
            }

            if (isRemove) {
                delta.remove.push(oldCoord);
            }
        }

        return delta;
    }

    _move(board, delta, newCoords) {
        for (let coord of delta.remove) {
            board[coord.y][coord.x] = null;
        }

        for (let coord of delta.add) {
            board[coord.y][coord.x] = this.color;
        }

        this.coordinates = newCoords;
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
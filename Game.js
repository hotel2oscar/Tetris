class Game {
    constructor() {
        this._blockTypes = [
            IBlock.generate,
            JBlock.generate,
            LBlock.generate,
            OBlock.generate,
            SBlock.generate,
            TBlock.generate,
            ZBlock.generate,
        ];

        this._spawnPoint = { x: 5, y: 19 };
        this._nextPoint = { x: 3, y: 3 };

        this._bag = [];
        this._fpsTimes = [];

        this._initializeState();

        this._timers = {
            time: setInterval(() => {
                if (!this.state.paused) { this.state.time++; }
            }, 1000),
            gravity: this._startGravity()
        }
    }

    get _gravityTime() { return 1000 - this.state.level * 25; }

    _startGravity() {
        let gravityTime = this._gravityTime;

        console.log(`gravityTime: ${gravityTime}`);

        return setInterval(() => {
            if (!this.state.paused) {
                if (this.state.block.active !== null) {
                    var moved = this._moveBlock(CONSTANTS.DIRECTION.DOWN);

                    if (moved === false) {
                        this._finishBlock();
                    }
                }
            }
        }, gravityTime);
    }

    _initializeBoard() {
        this.state.board = new Array(CONSTANTS.BOARD.HEIGHT);

        for (let i = 0; i < this.state.board.length; i++) {
            this.state.board[i] = this._addRow();
        }
    }

    _addRow() {
        let row = new Array(CONSTANTS.BOARD.WIDTH);

        for (let i = 0; i < row.length; i++) {
            row[i] = null;
        }

        return row;
    }

    _initializeState() {
        this.state = {
            level: 0,
            score: 0,
            lines: 0,
            time: 0,

            performance: {
                show: true,
                fps: 0,
            },

            paused: true,
            gameOver: true,

            block: {
                next: null,
                active: null,
            },

            board: []
        };

        this._initializeBoard();
    }

    static _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    _generateNewBag() {
        for (let generateBlock of this._blockTypes) {
            this._bag.push(generateBlock(this._nextPoint));
        }

        Game._shuffle(this._bag);
    }

    _nextPiece() {
        if (this._bag.length === 0) {
            this._generateNewBag();
        };

        // next -> active
        if (this.state.block.next !== null) {
            this.state.block.active = this.state.block.next;

            this.state.block.active.anchor = this._spawnPoint;

            if (this._collision(this.state.block.active)) {
                this.state.gameOver = true;
                this.state.paused = true;
            }
        }

        // bag -> next
        this.state.block.next = this._bag.shift();
    }

    _collision(block) {
        for (let coordinate of block.coordinates) {
            // edge detection
            if (coordinate.x < 0 || coordinate.x === CONSTANTS.BOARD.WIDTH ||
                coordinate.y < 0 || coordinate.y === CONSTANTS.BOARD.HEIGHT) {
                return true;
            }

            // another block
            if (this.state.board[coordinate.y][coordinate.x] !== null) {
                return true;
            }
        }

        return false;
    }

    _updateState(controlInput) {
        if (controlInput.start) {
            this.state.paused = !this.state.paused;

            if (this.state.gameOver) {
                this._initializeState();
                this.state.paused = false;
                this.state.gameOver = false;
            }
        }

        if (this.state.paused) {
            return;
        }

        if (this.state.block.active === null) {
            this._nextPiece();
        }
        else {
            if (controlInput.direction === CONSTANTS.DIRECTION.UP) {
                while (this._moveBlock(CONSTANTS.DIRECTION.DOWN)) { }
                this._finishBlock();
            }
            else {
                let moved = this._moveBlock(controlInput.direction);

                if (!moved && controlInput.direction === CONSTANTS.DIRECTION.DOWN) {
                    this._finishBlock();
                }
            }
        }
    }

    _moveBlock(direction) {
        let newBlock = this.state.block.active.move(direction);

        if (!this._collision(newBlock)) {
            this.state.block.active = newBlock;
            return true;
        } else {
            return false;
        }
    }

    _finishBlock() {
        let block = this.state.block.active;

        for (let coordinate of block.coordinates) {
            this.state.board[coordinate.y][coordinate.x] = block.color;
        }

        this.state.block.active = null;

        let lines = this._checkForFinishedLines();

        if (lines > 0) {
            this._updateScore(lines);
            this._updateLines(lines);
        }
    }

    _checkForFinishedLines() {
        let lines = 0;

        for (let y = 0; y < this.state.board.length; y++) {
            let row = this.state.board[y];

            let full = true;
            for (let x = 0; x < row.length; x++) {
                if (row[x] === null) {
                    full = false;
                }
            }

            if (full) {
                this.state.board.splice(y--, 1);
                lines++;
                this.state.board.push(this._addRow());
            }
        }

        return lines;
    }

    _updateScore(lines) {
        switch (lines) {
            case 1: this.state.score += 100; break;
            case 2: this.state.score += 250; break;
            case 3: this.state.score += 500; break;
            case 4: this.state.score += 800; break;
        }
    }

    _updateLines(lines) {
        this.state.lines += lines;

        if (Math.floor(this.state.lines / 10) > this.state.level) {
            this.state.level++;

            clearTimeout(this._timers.gravity);
            this._timers.gravity = this._startGravity();
        }
    }

    _updateFPS() {
        const now = performance.now();

        while (this._fpsTimes.length > 0 && this._fpsTimes[0] <= now - 1000) {
            this._fpsTimes.shift();
        }

        this._fpsTimes.push(now);
        this.state.performance.fps = this._fpsTimes.length;
    }

    update(controlInput) {
        this._updateState(controlInput);

        this._updateFPS();
    }
}

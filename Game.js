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

        this._bag = [];
        this._fpsTimes = [];

        this._initializeState();

        this._timers = {
            game: setInterval(() => {
                if (!this.state.paused) { this.state.time++; }
            }, 1000),
            gravity: setInterval(() => {
                // if (!this.state.paused) { this._moveBlock(CONSTANTS.DIRECTION.DOWN); }
            }, this._gravityTime)
        }
    }

    get _gravityTime() { return 1000 - this.state.level * 10; }

    _initializeBoard() {
        this.state.board = new Array(CONSTANTS.BOARD.HEIGHT);

        for (let i = 0; i < this.state.board.length; i++) {
            this.state.board[i] = new Array(CONSTANTS.BOARD.WIDTH);

            for (let j = 0; j < this.state.board[i].length; j++) {
                this.state.board[i][j] = null;
            }
        }
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
        for (let type of this._blockTypes) {
            this._bag.push(type());
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
            if (!this.state.block.active.spawn(this.state.board)) {
                this.state.gameOver = true;
                this.state.paused = true;
            }
        }
        // bag -> next
        this.state.block.next = this._bag.shift();
        this.state.block.next.setNext();
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

        if (this.state.block.active === null || this.state.block.active.done) {
            // TODO: check for complete row

            this._nextPiece();
        }
        else {
            // this.state.block.active.rotate(this.state.board, controlInput.rotation);
            // this.state.block.active.move(this.state.board, controlInput.direction);
            this._moveBlock(controlInput.direction);
        }
    }

    _moveBlock(direction) {
        if (this.state.block.active !== null && !this.state.block.active.done) {
            this.state.block.active.move(this.state.board, direction);
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

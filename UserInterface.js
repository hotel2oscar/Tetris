class UserInterface {
    constructor() {
        let canvas = document.getElementById('gameWindow');
        this._ctx = canvas.getContext('2d');

        this._ctx.font = `${CONSTANTS.BLOCKSIZE}px Consolas`;

        this._height = canvas.height;
        this._width = canvas.width;

        this._boardOffset = { x: 1, y: 1 };
        this._stateOffset = { x: this._boardOffset.x + 1 , y: this._boardOffset.y + CONSTANTS.BOARD.HEIGHT };
        this._sideBarOffset = { x: 15 , y: 2 };

        this._drawBoard();
    }

    _clear() {
        // FUTURE: only clear dynamic parts
        this._ctx.clearRect(0, 0, this._width, this._height);
    }

    _fillRect(x, y, width, height) {
        this._ctx.fillRect(x * CONSTANTS.BLOCKSIZE, y * CONSTANTS.BLOCKSIZE, width * CONSTANTS.BLOCKSIZE, height * CONSTANTS.BLOCKSIZE);
    }

    _strokeRect(x, y, width, height) {
        this._ctx.strokeRect(x * CONSTANTS.BLOCKSIZE, y * CONSTANTS.BLOCKSIZE, width * CONSTANTS.BLOCKSIZE, height * CONSTANTS.BLOCKSIZE);
    }

    _fillText(text, x, y) {
        this._ctx.fillText(text, x * CONSTANTS.BLOCKSIZE, y * CONSTANTS.BLOCKSIZE);
    }
    
    _drawBlock(x, y) {
        this._fillRect(x, y, 1, 1);
        this._strokeRect(x, y, 1, 1);
    }

    _drawBoard() {
        let position = { x: this._boardOffset.x, y: this._boardOffset.y };

        const EDGEWIDTH = CONSTANTS.BOARD.WIDTH + 1;
        const EDGEHEIGHT = CONSTANTS.BOARD.HEIGHT + 1;

        this._ctx.fillStyle = CONSTANTS.COLORS.GREY;
        this._ctx.strokeStyle = CONSTANTS.COLORS.DARKGREY;

        const drawEdge = (edgeSize, updateCoordinates) => {
            for (var i = 0; i < edgeSize; i++) {

                this._drawBlock(position.x, position.y);

                updateCoordinates();
            }
        };

        // top
        drawEdge(EDGEWIDTH, () => position.x += 1);

        // right
        drawEdge(EDGEHEIGHT, () => position.y += 1);

        // bottom
        drawEdge(EDGEWIDTH, () => position.x -= 1);

        // left
        drawEdge(EDGEHEIGHT, () => position.y -= 1);
    }

    _drawSideBar(state) {
        this._ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this._ctx.fillStyle = CONSTANTS.COLORS.BLACK;

        this._strokeRect(this._sideBarOffset.x, this._sideBarOffset.y, 8, 20);
        this._strokeRect(this._sideBarOffset.x + 1, this._sideBarOffset.y + 1, 6, 6);

        // bottom left of next block window
        let nextBlockOffset = { x: this._sideBarOffset.x + 1, y: this._sideBarOffset.y + 7 };

        const drawText = (label, value, y) => {
            this._fillText(label + ':', this._sideBarOffset.x + 2, this._sideBarOffset.y + y);
            this._fillText(`${value}`, this._sideBarOffset.x + 3, this._sideBarOffset.y + y + 1);
        };

        drawText('LEVEL', state.level, 9);
        drawText('SCORE', state.score, 11);
        drawText('LINES', state.lines, 13);
        drawText('TIME', state.time, 15);

        if (state.performance.show) {
            drawText('FPS', state.performance.fps, 17);
        }
    }

    _drawState(state) {
        this._ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this._ctx.fillStyle = CONSTANTS.COLORS.BLACK;

        const convertCoordinates = (x, y) => {
            let actualX = this._stateOffset.x + x;
            let actualY = this._stateOffset.y - y;

            return { x: actualX, y: actualY };
        };

        const drawText = (text, x, y) => {
            let position = convertCoordinates(x, y);

            this._fillText(text, position.x, position.y);
        };

        if (state.paused) {
            drawText('PAUSED', 3, 10);

            drawText('PRESS START', 2, 7);
            drawText('(OR SPACE)', 2, 6);
            drawText('TO PLAY', 2, 5);

        } else {
            for (let y = 0; y < state.board.length; y++) {
                for (let x = 0; x < state.board[y].length; x++) {
                    if (state.board[y][x] !== null) {

                        this._ctx.fillStyle = state.board[y][x];

                        let position = convertCoordinates(x, y);

                        this._drawBlock(position.x, position.y);
                    }
                }
            }
        }
    }

    render(state) {
        this._clear();
        // FUTURE: only drawboard once and don't clear it (static)
        this._drawBoard();
        this._drawSideBar(state);
        this._drawState(state);
    };
}


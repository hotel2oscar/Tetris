class UserInterface {
    constructor() {
        let canvas = document.getElementById('gameWindow');
        this._ctx = canvas.getContext('2d');

        this._ctx.font = `${CONSTANTS.BLOCKSIZE}px Consolas`;

        this._height = canvas.height;
        this._width = canvas.width;

        this._boardOffset = { x: 1 * CONSTANTS.BLOCKSIZE, y: 1 * CONSTANTS.BLOCKSIZE };
        this._sideBarOffset = { x: 15 * CONSTANTS.BLOCKSIZE, y: 2 * CONSTANTS.BLOCKSIZE };
        
        this._drawBoard();
    }

    _clear() {
        // FUTURE: only clear dynamic parts
        this._ctx.clearRect(0, 0, this._width, this._height);
    }

    _drawBlock(x, y, width) {
        this._ctx.fillRect(x, y, width, width);
        this._ctx.strokeRect(x, y, width, width);
    }

    _drawBoard() {
        let position = { x: this._boardOffset.x, y: this._boardOffset.y };

        const EDGEWIDTH = CONSTANTS.BOARD.WIDTH + 1;
        const EDGEHEIGHT = CONSTANTS.BOARD.HEIGHT + 1;

        this._ctx.fillStyle = CONSTANTS.COLORS.GREY;
        this._ctx.strokeStyle = CONSTANTS.COLORS.DARKGREY;

        const drawEdge = (edgeSize, updateCoordinates) => {
            for (var i = 0; i < edgeSize; i++) {

                this._drawBlock(position.x, position.y, CONSTANTS.BLOCKSIZE);

                updateCoordinates();
            }
        };

        // top
        drawEdge(EDGEWIDTH, () => position.x += CONSTANTS.BLOCKSIZE);

        // right
        drawEdge(EDGEHEIGHT, () => position.y += CONSTANTS.BLOCKSIZE);

        // bottom
        drawEdge(EDGEWIDTH, () => position.x -= CONSTANTS.BLOCKSIZE);

        // left
        drawEdge(EDGEHEIGHT, () => position.y -= CONSTANTS.BLOCKSIZE);
    }

    _drawSideBar(state) {
        this._ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this._ctx.fillStyle = CONSTANTS.COLORS.BLACK;

        this._ctx.strokeRect(this._sideBarOffset.x, this._sideBarOffset.y, CONSTANTS.BLOCKSIZE * 8, CONSTANTS.BLOCKSIZE * 20);

        // next block window
        this._ctx.strokeRect(this._sideBarOffset.x + CONSTANTS.BLOCKSIZE, this._sideBarOffset.y + CONSTANTS.BLOCKSIZE, CONSTANTS.BLOCKSIZE * 6, CONSTANTS.BLOCKSIZE * 6);

        // TODO: draw next block

        const drawText = (label, value, y) => {
            this._ctx.fillText(label + ':', this._sideBarOffset.x + 2 * CONSTANTS.BLOCKSIZE, this._sideBarOffset.y + y * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText(`${value}`, this._sideBarOffset.x + 3 * CONSTANTS.BLOCKSIZE, this._sideBarOffset.y + (y + 1) * CONSTANTS.BLOCKSIZE);
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

        if (state.paused) {
            this._ctx.fillText('PAUSED', 5 * CONSTANTS.BLOCKSIZE, 11 * CONSTANTS.BLOCKSIZE);

            this._ctx.fillText("PRESS START", 4 * CONSTANTS.BLOCKSIZE, 15 * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText("OR SPACE", 4 * CONSTANTS.BLOCKSIZE, 16 * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText("TO PLAY", 4 * CONSTANTS.BLOCKSIZE, 17 * CONSTANTS.BLOCKSIZE);

        } else {
            for (let y = 0; y < state.board.length; y++) {
                for (let x = 0; x < state.board[y].length; x++) {
                    if (state.board[y][x] !== null) {

                        this._ctx.fillStyle = state.board[y][x];

                        // canvas 0,0 is top left, we need 0,0 to be bottom left and offset from edge like board
                        let actualX = (2 + x) * CONSTANTS.BLOCKSIZE;
                        let actualY = (CONSTANTS.BOARD.HEIGHT - y + 1) * CONSTANTS.BLOCKSIZE;

                        this._drawBlock(actualX, actualY, CONSTANTS.BLOCKSIZE);
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


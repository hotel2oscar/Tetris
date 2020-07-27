class UserInterface {
    constructor() {
        let canvas = document.getElementById('gameWindow');
        this._ctx = canvas.getContext('2d');

        this._ctx.font = `${CONSTANTS.BLOCKSIZE}px Consolas`;

        this._height = canvas.height;
        this._width = canvas.width;

        this._drawBoard();

        this._boardOffset = { x: 1 * CONSTANTS.BLOCKSIZE, y: 1 * CONSTANTS.BLOCKSIZE };
        this._sideBarOffset = { x: 15 * CONSTANTS.BLOCKSIZE, y: 2 * CONSTANTS.BLOCKSIZE };
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
        // TODO: use boardOffset
        let startX = CONSTANTS.BLOCKSIZE;
        let startY = CONSTANTS.BLOCKSIZE;
        const EDGEWIDTH = CONSTANTS.BOARDWIDTH + 1;
        const EDGEHEIGHT = CONSTANTS.BOARDHEIGHT + 1;

        this._ctx.fillStyle = 'rgb(82, 87, 94)';
        this._ctx.strokeStyle = 'rgb(53, 57, 61)';

        const drawEdge = (edgeSize, updateCoordinates) => {
            for (var i = 0; i < edgeSize; i++) {

                this._drawBlock(startX, startY, CONSTANTS.BLOCKSIZE);

                updateCoordinates();
            }
        };

        // top
        drawEdge(EDGEWIDTH, () => startX += CONSTANTS.BLOCKSIZE);

        // right
        drawEdge(EDGEHEIGHT, () => startY += CONSTANTS.BLOCKSIZE);

        // bottom
        drawEdge(EDGEWIDTH, () => startX -= CONSTANTS.BLOCKSIZE);

        // left
        drawEdge(EDGEHEIGHT, () => startY -= CONSTANTS.BLOCKSIZE);
    }

    _drawSideBar(state) {
        let startX = CONSTANTS.BLOCKSIZE * 15;
        let startY = CONSTANTS.BLOCKSIZE * 2;

        this._ctx.strokeRect(startX, startY, CONSTANTS.BLOCKSIZE * 8, CONSTANTS.BLOCKSIZE * 20);

        // next block window
        this._ctx.strokeRect(startX + CONSTANTS.BLOCKSIZE, startY + CONSTANTS.BLOCKSIZE, CONSTANTS.BLOCKSIZE * 6, CONSTANTS.BLOCKSIZE * 6);

        // TODO: draw next block

        const drawText = (label, value, y) => {
            this._ctx.fillText(label + ':', startX + 2 * CONSTANTS.BLOCKSIZE, startY + y * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText(`${value}`, startX + 3 * CONSTANTS.BLOCKSIZE, startY + (y + 1) * CONSTANTS.BLOCKSIZE);
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
        if (state.paused) {
            this._ctx.fillText('PAUSED', 5 * CONSTANTS.BLOCKSIZE, 11 * CONSTANTS.BLOCKSIZE);

            this._ctx.fillText("PRESS START", 4 * CONSTANTS.BLOCKSIZE, 15 * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText("OR SPACE", 4 * CONSTANTS.BLOCKSIZE, 16 * CONSTANTS.BLOCKSIZE);
            this._ctx.fillText("TO PLAY", 4 * CONSTANTS.BLOCKSIZE, 17 * CONSTANTS.BLOCKSIZE);

        } else {
            this._ctx.strokeStyle = 'rgb(0, 0, 0)';

            for (let y = 0; y < state.board.length; y++) {
                for (let x = 0; x < state.board[y].length; x++) {
                    if (state.board[y][x] !== null) {

                        this._ctx.fillStyle = state.board[y][x];

                        // canvas 0,0 is top left, we need 0,0 to be bottom left and offset from edge like board
                        let actualX = (2 + x) * CONSTANTS.BLOCKSIZE;
                        let actualY = (CONSTANTS.BOARDHEIGHT - y + 1) * CONSTANTS.BLOCKSIZE;

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


class Block {
    constructor(anchor, color, offsets) {
        this._anchor = anchor;
        this._color = color;
        this._offsets = offsets;
        this._orientation = 0;
    }

    set anchor(newAnchor) {
        this._anchor = { x: newAnchor.x, y: newAnchor.y };
    }

    get coordinates() {
        let coordinates = [];

        for (let offset of this._offsets[this._orientation]) {
            coordinates.push({ x: this._anchor.x + offset.x, y: this._anchor.y + offset.y });
        }

        return coordinates;
    }

    get color() { return this._color; }

    _clone(anchor, orientation) {
        return this._cloneType(anchor, orientation);
    }

    _cloneType(anchor, orientation) { throw new Error('not implemented'); }

    move(direction) {
        let newAnchor = this._shift(direction);
        let newOrientation = this._rotate(direction);

        return this._clone(newAnchor, newOrientation);
    }

    _shift(direction) {
        switch (direction) {
            case CONSTANTS.DIRECTION.DOWN:
                return { x: this._anchor.x, y: this._anchor.y - 1 };
            case CONSTANTS.DIRECTION.LEFT:
                return { x: this._anchor.x - 1, y: this._anchor.y };
            case CONSTANTS.DIRECTION.RIGHT:
                return { x: this._anchor.x + 1, y: this._anchor.y };
            default: return this._anchor;
        }
    }

    _rotate(direction) {
        let newOrientation = this._orientation;

        switch (direction) {
            case CONSTANTS.DIRECTION.CLOCKWISE:
                newOrientation += 1;

                if (newOrientation === 4) {
                    newOrientation = 0;
                }
                break;
            case CONSTANTS.DIRECTION.COUNTERCLOCKWISE:
                newOrientation -= 1;

                if (newOrientation === -1) {
                    newOrientation = 3;
                }
                break;
        }

        return newOrientation;
    }

    static nextOffset(offset, update) {
        let nextOffset = [];

        for (let o of offset) {
            nextOffset.push(update(o));
        }

        return nextOffset;
    }
}

class IBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.CYAN, IBlock._offsets);
    }

    static get _offsets() {
        let index = 0;
        let offsets = [[{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }]];

        let updates = [
            (o) => { return { x: o.y, y: o.x } },
            (o) => { return { x: o.y, y: o.x - 1 } },
            (o) => { return { x: o.y, y: o.x } },
        ];

        for (let update of updates) {
            offsets.push(Block.nextOffset(offsets[index++], update));
        }

        return offsets;
    }

    static generate(anchor) { return new IBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new IBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class JBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.BLUE, JBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: -1, y: 0 }]];

        let update = (o) => { return { x: o.y, y: -1 * o.x } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new JBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new JBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class LBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.ORANGE, LBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }]];

        let update = (o) => { return { x: o.y, y: -1 * o.x } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new LBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new LBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class OBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.YELLOW, OBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }]];

        let update = (o) => { return { x: o.x, y: o.y } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new OBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new OBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class SBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.GREEN, SBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }]];

        let update = (o) => { return { x: o.y, y: -1 * o.x } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new SBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new SBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class TBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.PURPLE, TBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }]];

        let update = (o) => { return { x: o.y, y: -1 * o.x } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new TBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new TBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}

class ZBlock extends Block {
    constructor(anchor) {
        super(anchor, CONSTANTS.COLORS.RED, ZBlock._offsets);
    }

    static get _offsets() {
        let offsets = [[{ x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }]];

        let update = (o) => { return { x: o.y, y: -1 * o.x } };

        for (let i = 0; i < 3; i++) {
            offsets.push(Block.nextOffset(offsets[i], update));
        }

        return offsets;
    }

    static generate(anchor) { return new ZBlock(anchor); }

    _cloneType(anchor, orientation) {
        let newBlock = new ZBlock(anchor);
        newBlock._orientation = orientation;

        return newBlock;
    }
}
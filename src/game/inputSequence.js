// UI will make an instance of Input Sequence, fill it, then notify the game

export class InputSequence {
    constructor() {
        // Sequence of tiles
        this._tileSequence = [];
    }

    isTileAdjacentTo(tile1, tile2) {
        return Math.abs(tile1.row - tile2.row <= 1) && Math.abs(tile1.col - tile2.col <= 1)
    }

    // Is the new tile allowed based on the current sequence
    isTileAllowed(tile) {
        if (this._tileSequence.includes(tile)) return false;
        if (this._tileSequence.length === 0) return true;

        const allowedByValue = (
            // this._tileSequence.length === 1 && this._tileSequence[0].value === tile.value ||
            (this._tileSequence.length >= 1 && this._tileSequence[this._tileSequence.length - 1]._value === tile._value) ||
            (this._tileSequence.length > 1 && this._tileSequence[this._tileSequence.length - 1]._value * 2 === tile._value)
        )
        return this.isTileAdjacentTo(tile, this._tileSequence[this._tileSequence.length - 1]) && allowedByValue;
    }

    // TODO: One method should be responsible for determining whether to add or remove some,
    // or cancel (because new tile isnt allowed because of game rules)
    tryAddTile(tile) {
        if (this.isTileAllowed(tile)) {
            console.log('adding tile', tile);
            this._tileSequence.push(tile);
            return true;
        }
        return false;
    }

    subscribe() {
        // console.assert(false, "Subscription not implemented")
    }
}

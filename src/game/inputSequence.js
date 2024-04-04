// UI will make an instance of Input Sequence, fill it, then notify the game

export class InputSequence {
    constructor() {
        // Sequence of tiles
        this._tileSequence = [];
    }

    // Is the new tile allowed based on the current sequence
    isTileAllowed(tile) {
        return (
            this._tileSequence.length === 0 ||
            this._tileSequence.length === 1 && this._tileSequence[0].value === tile.value ||
            (this._tileSequence.length > 1 && this._tileSequence[this._tileSequence.length - 1].value === tile.value) ||
            (this._tileSequence.length > 1 && this._tileSequence[this._tileSequence.length - 1].value * 2 === tile.value)
        );
    }

    tryAddTile(tile) {
        if (this.isTileAllowed(tile)) {
            this._tileSequence.push(tile);
            return true;
        }
        return false;
    }

    // User hovered over tile. Try to remove all tiles after it from the sequence
    tryDiscardTiles(tile) {

    }
}

import { Tile } from "./tile.js";

export class Board {
    constructor(rows, cols, container) {
        this._rows = rows;
        this._cols = cols;
        this._container = container;
        this._tiles = []; // 2D array of tiles
    }

    /** This will be used to generate new numbers for the tiles that spawn.
     * You can set more than once to update the generator.
     * Pass either an array of values to choose from, or a generator function,
    */
    setNumberGenerator(numberGenerator) {
        if (Array.isArray(numberGenerator)) {
            this._numberGenerator = () => {
                const index = Math.floor(Math.random() * numberGenerator.length);
                return numberGenerator[index];
            }
            return;
        }

        if (typeof numberGenerator === "function") {
            this._numberGenerator = numberGenerator;
            return;
        }

        throw new Error("Number generator must be an array or a function");
    }

    /**
     * You only need to call this method once.
     * The input sequence itself will be responsible for notifying the game
     */
    setInputSequence(inputSequence) {
        this._inputSequence = inputSequence;
    }

    /**
     * Call this method after setting number generator
     * This method must be called before setInputSequence
     * Input sequence needs to be set to monitor any inputs
     */
    populateTiles() {
        if (!this._numberGenerator) throw new Error("Number generator not set");
        for (let i = 0; i < this._rows; i++) {
            const row = [];
            for (let j = 0; j < this._cols; j++) {
                const tile = new Tile(i, j, this._numberGenerator(), this._container, this);
                row.push(tile);
                // tile.on("mouseover", (e) => console.log(`Mouse Over ${i} ${j}`));
                // tile.on("mouseout", () => console.log(`Mouse Out ${i} ${j}`));
            }
            this._tiles.push(row);
        }

    }
}
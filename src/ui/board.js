import { Tile } from "./tile.js";

export class Board {
    constructor(rows, cols, container) {
        this._rows = rows;
        this._cols = cols;
        this._container = container;
        this._tiles = []; // 2D array of tiles
    }

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

    populateTiles() {
        if (!this._numberGenerator) throw new Error("Number generator not set");
        for (let i = 0; i < this._rows; i++) {
            const row = [];
            for (let j = 0; j < this._cols; j++) {
                const tile = new Tile(i, j, this._numberGenerator(), this._container, this);
                row.push(tile);
            }
            this._tiles.push(row);
        }
    }
}
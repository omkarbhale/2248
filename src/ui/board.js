import { log } from "../logger.js";
import { Tile } from "./tile.js";

export class Board {
    constructor(rows, cols, container) {
        this.container = container;
        this.tiles = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const tile = new Tile(i, j, container, this);
                row.push(tile);
            }
            this.tiles.push(row);
        }
    }
}
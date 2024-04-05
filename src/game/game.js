import { InputManager } from "./inputManager.js";
import { InputSequence } from "./inputSequence.js";
import { Tile } from "../ui/tile.js";

export class Game {
    constructor(board) {
        this.board = board;
        InputManager.instance.init(board);
        InputManager.instance.subscribe("select", ([row, col]) => { this.handleSelect(row, col) })
        InputManager.instance.subscribe("end", () => { this.handleSelectEnd() });
        
        this.currentInputSequence = this.newInputSequence();
    }
    
    newInputSequence() {
        const currentInputSequence = new InputSequence();
        currentInputSequence.subscribe("tileadded", (tile) => {
            console.assert(false, "Not implemented");
        });
        return currentInputSequence;
    }

    handleSelect(row, col) {
        console.log(`Selected ${row} ${col}`);
        const added = this.currentInputSequence.tryAddTile(this.board._tiles[row][col]);
        if (added) {
            this.board._tiles[row][col].activate(true);
        }
        console.log(this.currentInputSequence._tileSequence);
    }

    handleSelectEnd() {
        console.log(`Select ended`);
        // TODO: Change this to something more sophisticated
        this.currentInputSequence = this.newInputSequence();

        for (let i = 0; i < this.board._rows; i++) {
            for (let j = 0; j < this.board._cols; j++) {
                if (this.board._tiles[i][j]._isActive) {
                    this.board._tiles[i][j].remove().then(() => {
                        this.board._tiles[i][j] = new Tile(i, j, board._numberGenerator(), board._container, board);
                    });
                }
            }
        }
    }
}

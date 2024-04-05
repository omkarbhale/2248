import { ROWS, COLS } from "./constants.js"
import { Board } from "./ui/board.js";
import {InputSequence} from "./game/inputSequence.js"
import { Tile } from "./ui/tile.js";
import { Game } from "./game/game.js";

async function main() {
    console.log("info", "Starting");

    const container = document.querySelector(".container")
    const board = new Board(ROWS, COLS, container);
    // board.setNumberGenerator(() => { return undefined; });
    board.setNumberGenerator([2, 4, 4, 8, 8, 16, 32]);
    board.populateTiles();

    window.game = new Game(board);

    window.Tile = Tile;
    window.inputSequence = new InputSequence();
    window.board = board;
}
main();

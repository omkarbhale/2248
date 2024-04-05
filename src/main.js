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
    board.setNumberGenerator([4, 4, 4, 4]);
    board.populateTiles();

    window.game = new Game(board);
    // setInterval(() => {
    //     console.clear();
    //     console.table(board._tiles);
    // }, 50)
    window.board = board;
}
main();

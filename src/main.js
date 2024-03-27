import { ROWS, COLS } from "./constants.js"
import { Board } from "./ui/board.js";
import { Connection } from "./ui/connection.js";

async function main() {
    console.log("info", "Starting");

    const container = document.querySelector(".container")
    const board = new Board(ROWS, COLS, container);
    board.setNumberGenerator(() => { return undefined; });
    board.populateTiles();
    const c = new Connection(board._tiles[2][2], board._tiles[1][2], container);
    const c1 = new Connection(board._tiles[5][2], board._tiles[1][4], container);

    window.board = board;
    window.c = c;

    board._tiles[2][1].row = 8;
}
main();

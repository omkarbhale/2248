import {log} from "./logger.js";
import { Board } from "./ui/board.js";
import { rows, cols } from "./constants.js";

async function main() {
    log("info", "Starting");
    const board = new Board(rows, cols, document.querySelector(".container"));

    window.board = board;
}

main();
import { rows, cols } from "./constants.js"
import { Board } from "./ui/board.js";

// async function gameLoop() {
//     tile.update();
//     requestAnimationFrame(gameLoop);
// }

async function main() {
    console.log("info", "Starting");

    const container = document.querySelector(".container")
    const board = new Board(rows, cols, container);

    window.board = board;
}
main();
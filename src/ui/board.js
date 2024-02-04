import { log } from "../logger.js";

export class Board {
    constructor(rows, cols, parent) {
        this.rows = rows;
        this.cols = cols;
        this.boardElement = document.createElement("div");
        this.boardElement.classList.add("board");
        this.callbacks = {}; // From callback type to list of callbacks

        for (let i = 0; i < rows * cols; i++) {
            const tile = document.createElement("div");
            tile.textContent = i;
            tile.style.backgroundColor = this.randomColor();
            tile.classList.add("tile");
            tile.classList.add("spawned");

            tile.addEventListener("click", (e) => {
                this.callbacks["tile-click"]?.forEach(callback => callback(e));
            });

            this.boardElement.appendChild(tile);
        }
        parent.appendChild(this.boardElement);

    }

    // tile-click
    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }
    off(event, callback) {
        if (!this.callbacks[event]) {
            return;
        }
        this.callbacks[event].splice(this.callbacks[event].indexOf(callback), 1);
    }

    activateTile(row, col, flag = true) {
        if (flag) {
            this.boardElement.children[row * this.cols + col].classList.add("active");
        } else {
            this.boardElement.children[row * this.cols + col].classList.remove("active");
        }
    }

    randomColor() {
        return `rgb(${Math.floor(Math.random() * 255)
            }, ${Math.floor(Math.random() * 255)
            }, ${Math.floor(Math.random() * 255)
            })`
    }

    // Destroys n tiles starting at row, col in north direction
    destroyTile(row, col, numberOfTiles) {
        if (!numberOfTiles) {
            console.log("Number of tiles to destroy is chosen randomly in debug mode");
            numberOfTiles = Math.floor(Math.random() * row);
        }

        return new Promise(async (res, rej) => {
            // Make sure that numberOfTiles exist starting from the given row
            if (!(numberOfTiles <= row + 1) || numberOfTiles == 0) rej("Invalid number of tiles to destroy");

            // Hide all destroyed tiles
            for (let i = 0; i < numberOfTiles; i++) {
                // tile destroyed is (row - i)
                this.boardElement.children[(row - i) * this.cols + col].style.visibility = "hidden";
                this.boardElement.children[(row - i) * this.cols + col].classList.add("spawned");
            }

            // Maps tile values from (old) row index to values
            const tileValues = {};
            // Give all the above tiles a fall animation
            for (let r = 0; r < (row - numberOfTiles + 1); r++) {
                this.boardElement.children[r * this.cols + col].style.setProperty("--fall-distance", `${numberOfTiles}`);
                this.boardElement.children[r * this.cols + col].classList.add("falling");
                this.boardElement.children[r * this.cols + col].classList.add("spawned");
                tileValues[r] = {
                    textContent: this.boardElement.children[r * this.cols + col].textContent,
                    backgroundColor: this.boardElement.children[r * this.cols + col].style.backgroundColor.toString(),
                };
            }

            // When the animation ends, update each tile values as they fell
            await new Promise((res, rej) => {
                if (row - numberOfTiles + 1 <= 0) {
                    res();
                }
                for (let i = 0; i < row - numberOfTiles + 1; i++) {
                    this.boardElement.children[i * this.cols + col].addEventListener("animationend", (e) => {
                        this.boardElement.children[i * this.cols + col].classList.remove("falling");
                        const destinationNumber = i + numberOfTiles;
                        this.boardElement.children[destinationNumber * this.cols + col].textContent = tileValues[i].textContent;
                        this.boardElement.children[destinationNumber * this.cols + col].style.backgroundColor = tileValues[i].backgroundColor;
                        res();
                    }, { once: true });
                }
            });
            // Wait for animaiton to complete

            // Spawn in new tiles
            // Resolve destroyTiles after spawn animation completes
            for (let i = 0; i < numberOfTiles; i++) {
                this.boardElement.children[i * this.cols + col].classList.remove("spawned");
                this.boardElement.children[i * this.cols + col].textContent = Math.floor(Math.random() * 20);
                this.boardElement.children[i * this.cols + col].style.backgroundColor = this.randomColor();
                this.boardElement.children[i * this.cols + col].addEventListener("animationend", () => {
                    setTimeout(res, 100);
                }, { once: true });
            }

            // Show all destroyed tiles
            for (let i = 0; i < numberOfTiles; i++) {
                // tile destroyed is (row - i)
                this.boardElement.children[(row - i) * this.cols + col].style.visibility = "visible";
            }
        });
    }
}
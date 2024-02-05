export class Tile {
    constructor(row, col, container, board) {
        this._row = row;
        this._col = col;
        this._board = board;

        this.element = document.createElement("div");
        this.element.textContent = `(${row}, ${col})`;
        this.element.classList.add("tile");
        this.element.style.setProperty("--i", row);
        this.element.style.setProperty("--j", col);
        this.element.style.setProperty("--bg-color", this.randomColor());
        container.appendChild(this.element);
    }

    randomColor() {
        return `rgba(${
            Math.floor(Math.random() * 255)
        }, ${
            Math.floor(Math.random() * 255)
        }, ${
            Math.floor(Math.random() * 255)
        })`
    }

    set row(r) {
        this._row = r;
        this.element.style.setProperty("--i", this._row);
    }

    set col(c) {
        this._col = c;
        this.element.style.setProperty("--j", this._col);
    }

    free() {
        this.element.addEventListener("animationend", (e) => {
            e.target.remove();
            this._board.tiles[this._row][this._col] = new Tile(this._row, this._col, this._board.container, this._board);
        }, { once: true });
        this.element.classList.add("kill");
    }
}
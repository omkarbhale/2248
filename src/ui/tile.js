export class Tile {
    constructor(row, col, num, container, board) {
        this._row = row;
        this._col = col;
        this._board = board;

        this._element = document.createElement("div");
        this._element.textContent = num ? num : `(${row}, ${col})`;
        this._element.classList.add("tile");
        this._element.style.setProperty("--i", row);
        this._element.style.setProperty("--j", col);
        this._element.style.setProperty("--bg-color", this.randomColor());
        container.appendChild(this._element);
    }

    randomColor() {
        return `rgba(${
            105+ Math.floor(Math.random() * 150)
        }, ${
            105 + Math.floor(Math.random() * 150)
        }, ${
            105 + Math.floor(Math.random() * 150)
        })`
    }

    set row(r) {
        this._row = r;
        this._element.style.setProperty("--i", this._row);
    }

    set col(c) {
        this._col = c;
        this._element.style.setProperty("--j", this._col);
    }

    remove(onRemove) {
        if (!this._element.isConnected) {
            throw new Error("Tried to remove a tile which was already removed");
        }
        this._element.addEventListener("animationend", (e) => {
            e.target.remove();
            onRemove ? onRemove(this._row, this._col) : undefined;
        }, { once: true });
        this._element.classList.add("kill");
    }
}
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

        this._events = {
            "positionchange": [
                // {callback, once, args, originalCallback, applied}
            ],
        }
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

    /**
     * 
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @param {boolean?} once Once
     * @param {any[]} args Args to be passed to the callback
     */
    on(event, callback_, once=false, ...args) {
        if (!this._events.hasOwnProperty(event)) {
            throw new Error(`Event ${event} is not supported`);
        }
        if (!args) args = [];
        this._events[event].push({
            callback: (e) => {
                callback_(e, ...args);
            },
            once,
            args,
            originalCallback: callback_,
            applied: false,
        });
        this._applyEvents(true);
    }

    off() {
        throw new Error("Not implemented off")
    }

    /**
     * 
     * @param {boolean} toApply Whether to add to remove
     */
    _applyEvents(toApply) {
        for (const event in this._events) {
            for (const { callback, once, args, applied } of this._events[event]) {
                if (toApply) {
                    if (applied) continue;

                    switch (event) {
                        case "positionchange":
                            // Don't need to apply positionchange
                        break;
                        case "click":
                            // TODO
                        break;
                        default:
                            throw new Error("Unreachable code");
                    }
                }
            }
        }
    }

    get row() {
        return this._row;
    }
    set row(r) {
        const dr = r - this._row;
        this._row = r;
        this._element.style.setProperty("--i", this._row);
        this._onPositionChanged(dr, 0);
    }

    get col() {
        return this._col;
    }
    set col(c) {
       const dc = c - this._col;
       this._col = c;
       this._element.style.setProperty("--j", this._col);
       this._onPositionChanged(0, dc);
    }

    /**
     * 
     * @param {number} dr Delta row
     * @param {number} dc Delta column
     */
    _onPositionChanged(dr, dc) {
        for (const key in this._events["positionchange"]) {
            const { callback, once, args, applied } = this._events["positionchange"][key];
            callback({ target: this, row: this._row, col: this._col, drow: dr, dcol: dc }, ...args);
        }
    }

    remove() {
        return new Promise((res, rej) => {
            if (!this._element.isConnected) {
                rej("Tried to remove a tile which was already removed");
            }
            this._element.addEventListener("animationend", (e) => {
                res(this._row, this._col);
            }, { once: true });
            this._element.classList.add("kill");
        })
    }
}
import { Tile } from "../ui/tile.js";

export class InputManager {
    static _instance = null;
    static get instance() {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }
        return InputManager._instance;
    }

    constructor() {
        this.isPressed = false;
        this.subscribers = {};
        this.currentHovered = [null, null];
    }

    init(board) {
        this.board = board;
        for (let i = 0; i < this.board._rows; i++) {
            for (let j = 0; j < this.board._cols; j++) {
                this.applyEventsOnTile(this.board._tiles[i][j], i, j);
                // this.board._tiles[i][j].on('mouseup', (e) => { this.handleMouseUp(e, i, j) });
            }
        }
        document.body.addEventListener('mouseup', (e) => { this.handleMouseUp(e); });
        Tile.subscribe("newtile", (tile) => {
            console.log("newtile", tile);
            this.applyEventsOnTile(tile, tile._row, tile._col);
        });
    }

    applyEventsOnTile(tile, i, j) {
        tile.on('mousedown', (e) => { this.handleMouseDown(e, i, j) });
        // this.board._tiles[i][j].on('mouseup', (e) => { this.handleMouseUp(e, i, j) });
        tile.on('mouseover', (e) => { this.handleMouseOver(e, i, j) });
        tile.on('mouseout', (e) => { this.handleMouseOut(e, i, j) });
    }

    handleMouseDown(e, row, col) {
        if (!this.isPressed) {
            this.isPressed = true;
        }
        if (this.currentHovered[0] !== null) {
            this.publishEvent("select", [row, col]);
        }
    }
    
    handleMouseUp(e) {
        this.isPressed = false;
        this.publishEvent("end", null);
    }

    handleMouseOver(e, row, col) {
        this.currentHovered = [row, col];
        if (this.isPressed) {
            this.publishEvent("select", [row, col]);
        }
    }

    handleMouseOut(e, row, col) {
        this.currentHovered[0] = null;
        this.currentHovered[1] = null;
    }

    publishEvent(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(subscriberCallback => subscriberCallback(data));
    }

    subscribe(event, callback) {
        let index;
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        index = this.subscribers[event].push(callback) - 1;

        console.warn("TODO: Fix Index bug");
        return {
            unsubscribe() {
                this.subscribers[event].splice(index, 1);
            }
        };
    }
}

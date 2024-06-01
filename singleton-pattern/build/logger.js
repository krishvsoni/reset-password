"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startlogger = void 0;
const GameManager_1 = require("./GameManager");
function startlogger() {
    setInterval(() => {
        GameManager_1.GameManager.getInstance().logState();
    }, 4000);
}
exports.startlogger = startlogger;

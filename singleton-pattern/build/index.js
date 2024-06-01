"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("./GameManager");
const logger_1 = require("./logger");
(0, logger_1.startlogger)();
setInterval(() => {
    GameManager_1.GameManager.getInstance().addGame({
        id: Math.random().toString(),
        "whitePlayer": "MESSI",
        "blackPlayer": "RONALDO",
        moves: []
    });
}, 5000);

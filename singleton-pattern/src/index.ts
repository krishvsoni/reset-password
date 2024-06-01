import { GameManager } from "./GameManager";
import { startlogger } from "./logger";

startlogger();

setInterval(() => {
    GameManager.getInstance().addGame({
        id: Math.random().toString(),
        "whitePlayer": "MESSI",
        "blackPlayer": "RONALDO",
        moves: []
    })
}, 5000)
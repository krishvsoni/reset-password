import { GameManager } from "./GameManager";


export function startlogger(){
    setInterval(() => {
        GameManager.getInstance().logState();

    },4000)
}
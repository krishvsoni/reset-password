"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubsubManager_1 = require("./PubsubManager");
setInterval(() => {
    PubsubManager_1.PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000);

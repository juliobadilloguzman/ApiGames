"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', gamesController_1.default.getGames);
        this.router.get('/:id', gamesController_1.default.getGame);
        this.router.get('/buscar/:busqueda', gamesController_1.default.searchGame);
        this.router.post('/', gamesController_1.default.createGame);
        this.router.put('/:id', gamesController_1.default.updateGame);
        this.router.delete('/:id', gamesController_1.default.deleteGame);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    getGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM game', (err, result) => {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('SELECT * FROM game WHERE id = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: "Game not founded" });
                }
            });
        });
    }
    createGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO game SET ?', [req.body]);
            res.json({ message: 'Game created' });
        });
    }
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('UPDATE game SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'Game updated' });
        });
    }
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM game WHERE id = ?', [id]);
            res.json({ message: 'Game deleted' });
        });
    }
    searchGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = req.params.busqueda;
            yield database_1.default.query(`SELECT * from game WHERE title LIKE '%${busqueda}%'`, [busqueda], (err, result) => {
                if (err)
                    throw err;
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: "Game not founded" });
                }
            });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;

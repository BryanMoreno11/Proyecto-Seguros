"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class AseguradorasAutomovilesController {
    index(req, res) {
        database_1.default.query("Describe facilitaSeguros");
        res.json("Hola xdd");
    }
}
const aseguradorasAutomovilesController = new AseguradorasAutomovilesController();
exports.default = aseguradorasAutomovilesController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modeloController_1 = __importDefault(require("../controllers/modeloController"));
class Modelo {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', modeloController_1.default.list);
        this.router.get('/:id', modeloController_1.default.getOne);
        this.router.post('/', modeloController_1.default.create);
        this.router.put('/:id', modeloController_1.default.update);
        this.router.delete('/:id', modeloController_1.default.delete);
    }
}
const modelo = new Modelo();
exports.default = modelo.router;

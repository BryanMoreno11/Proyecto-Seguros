"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aseguradoraVidaController_1 = __importDefault(require("../controllers/aseguradoraVidaController"));
class AseguradorasVida {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', aseguradoraVidaController_1.default.list);
        this.router.get('/:id', aseguradoraVidaController_1.default.getOne);
        this.router.post('/', aseguradoraVidaController_1.default.create);
        this.router.put('/:id', aseguradoraVidaController_1.default.update);
        this.router.delete('/:id', aseguradoraVidaController_1.default.delete);
    }
}
const aseguradorasVida = new AseguradorasVida();
exports.default = aseguradorasVida.router;

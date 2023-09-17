"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteVidaController_1 = __importDefault(require("../controllers/clienteVidaController"));
class ClienteVida {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clienteVidaController_1.default.list);
        this.router.get('/:id', clienteVidaController_1.default.getOne);
        this.router.post('/', clienteVidaController_1.default.create);
        this.router.put('/:id', clienteVidaController_1.default.update);
        this.router.delete('/:id', clienteVidaController_1.default.delete);
    }
}
const clienteVida = new ClienteVida();
exports.default = clienteVida.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = __importDefault(require("../controllers/clienteController"));
class Cliente {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clienteController_1.default.list);
        this.router.get('/:id', clienteController_1.default.getOne);
        this.router.post('/', clienteController_1.default.create);
        this.router.put('/:id', clienteController_1.default.update);
        this.router.delete('/:id', clienteController_1.default.delete);
    }
}
const cliente = new Cliente();
exports.default = cliente.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaController_1 = __importDefault(require("../controllers/marcaController"));
class Marca {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', marcaController_1.default.list);
        this.router.get('/:id', marcaController_1.default.getOne);
        this.router.post('/', marcaController_1.default.create);
        this.router.put('/:id', marcaController_1.default.update);
        this.router.delete('/:id', marcaController_1.default.delete);
    }
}
const marca = new Marca();
exports.default = marca.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const anioController_1 = __importDefault(require("../controllers/anioController"));
class Anio {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', anioController_1.default.list);
        this.router.get('/:id', anioController_1.default.getOne);
        this.router.post('/', anioController_1.default.create);
        this.router.put('/:id', anioController_1.default.update);
        this.router.delete('/:id', anioController_1.default.delete);
    }
}
const anio = new Anio();
exports.default = anio.router;

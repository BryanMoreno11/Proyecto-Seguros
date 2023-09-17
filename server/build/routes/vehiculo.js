"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculoController_1 = __importDefault(require("../controllers/vehiculoController"));
class Vehiculo {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', vehiculoController_1.default.list);
        this.router.get('/:id', vehiculoController_1.default.getOne);
        this.router.post('/', vehiculoController_1.default.create);
        this.router.put('/:id', vehiculoController_1.default.update);
        this.router.delete('/:id', vehiculoController_1.default.delete);
    }
}
const vehiculo = new Vehiculo();
exports.default = vehiculo.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seguroVehiculoController_1 = __importDefault(require("../controllers/seguroVehiculoController"));
class SeguroVehiculo {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', seguroVehiculoController_1.default.list);
        this.router.get('/:id', seguroVehiculoController_1.default.getOne);
        this.router.post('/', seguroVehiculoController_1.default.create);
        this.router.put('/:id', seguroVehiculoController_1.default.update);
        this.router.delete('/:id', seguroVehiculoController_1.default.delete);
    }
}
const seguroVehiculo = new SeguroVehiculo();
exports.default = seguroVehiculo.router;

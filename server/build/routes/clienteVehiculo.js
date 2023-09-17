"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteVehiculoController_1 = __importDefault(require("../controllers/clienteVehiculoController"));
class ClienteVehiculo {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clienteVehiculoController_1.default.list);
        this.router.get('/:id', clienteVehiculoController_1.default.getOne);
        this.router.post('/', clienteVehiculoController_1.default.create);
        this.router.put('/:id', clienteVehiculoController_1.default.update);
        this.router.delete('/:id', clienteVehiculoController_1.default.delete);
    }
}
const clienteVehiculo = new ClienteVehiculo();
exports.default = clienteVehiculo.router;

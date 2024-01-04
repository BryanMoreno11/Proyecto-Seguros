"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valoracion_1 = __importDefault(require("../controllers/valoracion"));
class Valoracion {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', valoracion_1.default.list);
        this.router.post('/', valoracion_1.default.create);
    }
}
const valoracion = new Valoracion();
exports.default = valoracion.router;

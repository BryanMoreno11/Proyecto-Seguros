"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const correoController_1 = __importDefault(require("../controllers/correoController"));
class CorreoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', correoController_1.default.envioCorreo);
        this.router.post('/envioaseguradora/', correoController_1.default.envioCorreoAseguradora);
        this.router.post('/vida/', correoController_1.default.envioCorreoVida);
        this.router.post('/envioaseguradoravida/', correoController_1.default.envioCorreoAseguradoraVida);
    }
}
const correoRoutes = new CorreoRoutes();
exports.default = correoRoutes.router;

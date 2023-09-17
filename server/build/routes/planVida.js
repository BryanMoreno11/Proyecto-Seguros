"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planVidaController_1 = __importDefault(require("../controllers/planVidaController"));
class PlanVida {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', planVidaController_1.default.list);
        this.router.get('/:id', planVidaController_1.default.getOne);
        this.router.post('/', planVidaController_1.default.create);
        this.router.put('/:id', planVidaController_1.default.update);
        this.router.delete('/:id', planVidaController_1.default.delete);
    }
}
const planVida = new PlanVida();
exports.default = planVida.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aseguradorasAutomovilesController_1 = __importDefault(require("../controllers/aseguradorasAutomovilesController"));
class AseguradorasAutomoviles {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', aseguradorasAutomovilesController_1.default.list);
        this.router.get('/:id', aseguradorasAutomovilesController_1.default.getOne);
        this.router.post('/', aseguradorasAutomovilesController_1.default.create);
        this.router.put('/:id', aseguradorasAutomovilesController_1.default.update);
        this.router.delete('/:id', aseguradorasAutomovilesController_1.default.delete);
    }
}
const aseguradorasAutomoviles = new AseguradorasAutomoviles();
exports.default = aseguradorasAutomoviles.router;

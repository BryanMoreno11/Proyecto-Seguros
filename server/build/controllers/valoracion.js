"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ValoracionController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente, valoracion } = req.body;
            try {
                const queryText = "INSERT INTO valoracion ( id_cliente, valoracion) VALUES ($1, $2)";
                const queryParams = [id_cliente, valoracion];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Valoración guardada" });
            }
            catch (error) {
                console.error("Error al crear valoración:", error);
                res.status(500).json({ error: "Ocurrió un error al crear la valoración" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const valoraciones = yield database_1.default.query("SELECT * FROM valoracion");
                res.json(valoraciones);
            }
            catch (error) {
                console.error("Error al listar valoraciones:", error);
                res.status(500).json({ error: "Ocurrió un error al listar valoraciones" });
            }
        });
    }
}
const valoracionController = new ValoracionController();
exports.default = valoracionController;

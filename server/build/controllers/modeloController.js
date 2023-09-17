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
class ModeloController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, marca, factor_riesgo } = req.body;
            try {
                const queryText = "INSERT INTO modelo ( nombre, marca, factor_riesgo) VALUES ($1, $2, $3)";
                const queryParams = [nombre, marca, factor_riesgo];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Modelo guardado" });
            }
            catch (error) {
                console.error("Error al crear modelo:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el modelo" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelo = yield database_1.default.query("SELECT * FROM modelo");
                res.json(modelo);
            }
            catch (error) {
                console.error("Error al listar modelos:", error);
                res.status(500).json({ error: "Ocurrió un error los modelos" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM modelo WHERE id_modelo =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar el modelo:", error);
                res.status(500).json({ error: "Ocurrió un error al listar el modelo de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE modelo SET  nombre=$1, marca=$2, factor_riesgo=$3 WHERE id_modelo=$4";
            const { nombre, marca, factor_riesgo } = req.body;
            const params = [nombre, marca, factor_riesgo, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Modelo actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el modelo:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el modelo de id: " + req.params.id });
            }
        });
    }
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM modelo WHERE id_modelo=$1", [req.params.id]);
            res.json({ Text: `Eliminando el modelo de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el modelo de id " + req.params.id });
        }
    }
}
const modeloController = new ModeloController();
exports.default = modeloController;

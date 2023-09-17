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
class AnioController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, factor_riesgo } = req.body;
            try {
                const queryText = "INSERT INTO anio ( nombre, factor_riesgo) VALUES ($1, $2)";
                const queryParams = [nombre, factor_riesgo];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Año guardado" });
            }
            catch (error) {
                console.error("Error al crear año:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el año" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anios = yield database_1.default.query("SELECT * FROM anio");
                res.json(anios);
            }
            catch (error) {
                console.error("Error al listar años:", error);
                res.status(500).json({ error: "Ocurrió un error al listar años" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM anio WHERE id_anio =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar el año:", error);
                res.status(500).json({ error: "Ocurrió un error al listar el año de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE anio SET  nombre=$1, factor_riesgo=$2 WHERE id_anio=$3";
            const { nombre, factor_riesgo } = req.body;
            const params = [nombre, factor_riesgo, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Año actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar año:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el año de id: " + req.params.id });
            }
        });
    }
    //-Eliminar
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM anio WHERE id_anio=$1", [req.params.id]);
            res.json({ Text: `Eliminando año de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el año de id " + req.params.id });
        }
    }
}
const anioController = new AnioController();
exports.default = anioController;

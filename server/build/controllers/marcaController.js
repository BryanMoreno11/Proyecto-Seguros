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
class MarcaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_marca, nombre, precio, porcentaje } = req.body;
            try {
                const queryText = "INSERT INTO marca (id_marca, nombre, precio, porcentaje) VALUES ($1, $2, $3, $4)";
                const queryParams = [id_marca, nombre, precio, porcentaje];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Marca guardada" });
            }
            catch (error) {
                console.error("Error al crear marca:", error);
                res.status(500).json({ error: "Ocurrió un error al crear la marca" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marca = yield database_1.default.query("SELECT * FROM marca");
                res.json(marca);
            }
            catch (error) {
                console.error("Error al listar marcas:", error);
                res.status(500).json({ error: "Ocurrió un error con las marcas" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM marca WHERE id_marca =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar la marca:", error);
                res.status(500).json({ error: "Ocurrió un error al listar la marca de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE marca SET id_marca=$1, nombre=$2, precio=$3, porcentaje=$4 WHERE id_marca=$5";
            const { id_marca, nombre, precio, porcentaje } = req.body;
            const params = [id_marca, nombre, precio, porcentaje, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Marca actualizada correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar la marca:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar la marca de id: " + req.params.id });
            }
        });
    }
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM marca WHERE id_marca=$1", [req.params.id]);
            res.json({ Text: `Eliminando la marca de id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar la marca de id " + req.params.id });
        }
    }
}
const marcaController = new MarcaController();
exports.default = marcaController;

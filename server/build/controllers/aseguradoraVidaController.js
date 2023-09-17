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
class AseguradoraVidaController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, correo, telefono, descripcion, imagen } = req.body;
            try {
                const queryText = "INSERT INTO aseguradora_vida ( nombre, correo, telefono, descripcion,imagen) VALUES ($1, $2, $3, $4, $5)";
                const queryParams = [nombre, correo, telefono, descripcion, imagen];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Aseguradora de vida guardado" });
            }
            catch (error) {
                console.error("Error al crear aseguradora de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al crear aseguradora de vida" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aseguradoras = yield database_1.default.query("SELECT * FROM aseguradora_vida");
                res.json(aseguradoras);
            }
            catch (error) {
                console.error("Error al listar aseguradoras de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al listar las aseguradoras de vida" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM aseguradora_vida WHERE id_aseguradora_vida =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar las aseguradoras de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al listar la aseguradora de vida de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE aseguradora_vida SET  nombre=$1, correo=$2, telefono=$3, descripcion=$4,imagen=$5 WHERE id_aseguradora_vida=$6";
            const { nombre, correo, telefono, descripcion, imagen } = req.body;
            const params = [nombre, correo, telefono, descripcion, imagen, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Aseguradora de vida actualizada correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar aseguradora de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar la aseguradora de vida de id: " + req.params.id });
            }
        });
    }
    //-Eliminar
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM aseguradora_vida WHERE id_aseguradora_vida=$1", [req.params.id]);
            res.json({ Text: `Eliminando aseguradora de vida del id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar la aseguradora de vida de id " + req.params.id });
        }
    }
}
const aseguradoraVidaController = new AseguradoraVidaController();
exports.default = aseguradoraVidaController;

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
class PlanVidaController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_aseguradora_vida, nombre, descripcion, precio } = req.body;
            try {
                const queryText = "INSERT INTO plan_vida ( id_aseguradora_vida, nombre,descripcion,precio) VALUES ($1, $2, $3, $4)";
                const queryParams = [id_aseguradora_vida, nombre, descripcion, precio];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Plan de vida guardado" });
            }
            catch (error) {
                console.error("Error al crear plan de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el plan de vida" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan_vida = yield database_1.default.query("SELECT * FROM vista_plan_vida");
                res.json(plan_vida);
            }
            catch (error) {
                console.error("Error al listar planes de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al listar los planes de vida" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM plan_vida WHERE id_plan_vida =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar los planes de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al listar el plan de vida de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE plan_vida SET  id_aseguradora_vida=$1, nombre=$2, descripcion=$3, precio=$4 WHERE id_plan_vida=$5";
            const { id_aseguradora_vida, nombre, descripcion, precio } = req.body;
            const params = [id_aseguradora_vida, nombre, descripcion, precio, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Plan de vida actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el plan de vida:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el plan de vida de id: " + req.params.id });
            }
        });
    }
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM plan_vida WHERE id_plan_vida=$1", [req.params.id]);
            res.json({ Text: `Eliminando plan de vida del id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el plan de vida de id " + req.params.id });
        }
    }
}
const planVidaController = new PlanVidaController();
exports.default = planVidaController;

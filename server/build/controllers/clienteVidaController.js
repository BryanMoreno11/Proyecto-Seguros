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
class ClienteVidaController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente, id_plan_vida } = req.body;
            try {
                const queryText = "INSERT INTO cliente_vida ( id_cliente ,id_plan_vida ) VALUES ($1, $2)";
                const queryParams = [id_cliente, id_plan_vida];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Cliente_Vida guardado" });
            }
            catch (error) {
                console.error("Error al crear Cliente_Vida:", error);
                res.status(500).json({ error: "Ocurrió un error al crear Cliente_Vida" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientevida = yield database_1.default.query("SELECT * FROM cliente_vida");
                res.json(clientevida);
            }
            catch (error) {
                console.error("Error al listar Cliente_vida:", error);
                res.status(500).json({ error: "Ocurrió un error al listar Cliente_vida" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM cliente_vida WHERE id_cliente_vida =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar Cliente_vida", error);
                res.status(500).json({ error: "Ocurrió un error al listar Cliente_vida de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE cliente_vida SET  id_cliente=$1, id_plan_vida=$2 WHERE id_cliente_vida=$3";
            const { id_cliente, id_plan_vida } = req.body;
            const params = [id_cliente, id_plan_vida, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Cliente_vida actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar Cliente_vida:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar Cliente_vida de id: " + req.params.id });
            }
        });
    }
    //-Eliminar
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM cliente_vida WHERE id_cliente_vida=$1", [req.params.id]);
            res.json({ Text: `Eliminado Cliente_vida de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar Cliente_vida de id " + req.params.id });
        }
    }
}
const clienteVidaController = new ClienteVidaController();
exports.default = clienteVidaController;

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
class ClienteVehiculoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente, id_seguro_vehiculo } = req.body;
            try {
                const queryText = "INSERT INTO cliente_vehiculo ( id_cliente, id_seguro_vehiculo) VALUES ($1, $2) RETURNING *";
                const queryParams = [id_cliente, id_seguro_vehiculo];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json(result);
            }
            catch (error) {
                console.error("Error al crear clientevehiculo:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el clientevehiculo" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientevehiculo = yield database_1.default.query("SELECT * FROM vista_cliente_vehiculo");
                res.json(clientevehiculo);
            }
            catch (error) {
                console.error("Error al listar clientesvehiculo:", error);
                res.status(500).json({ error: "Ocurrió un error con los clientesvehiculo" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM vista_cliente_vehiculo WHERE id_cliente_vehiculo =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar el clientevehiculo:", error);
                res.status(500).json({ error: "Ocurrió un error al listar el clientevehiculo de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE cliente_vehiculo SET  id_cliente=$1, id_seguro_vehiculo=$2 WHERE id_cliente_vehiculo=$3";
            const { id_cliente, id_seguro_vehiculo } = req.body;
            const params = [id_cliente, id_seguro_vehiculo, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Clientevehiculo actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el clientevehiculo:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el clientevehiculo de id: " + req.params.id });
            }
        });
    }
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM cliente_vehiculo WHERE id_cliente_vehiculo=$1", [req.params.id]);
            res.json({ Text: `Eliminando el clientevehiculo de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el clientevehiculo de id " + req.params.id });
        }
    }
}
const clienteVehiculoController = new ClienteVehiculoController();
exports.default = clienteVehiculoController;

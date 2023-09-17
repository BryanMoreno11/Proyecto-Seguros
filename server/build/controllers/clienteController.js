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
class ClienteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, nombre, apellido, fecha_nacimiento, provincia, ciudad, telefono, correo } = req.body;
            try {
                const queryText = "INSERT INTO cliente ( cedula, nombre, apellido, fecha_nacimiento,provincia,ciudad,telefono,correo ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
                const queryParams = [cedula, nombre, apellido, fecha_nacimiento, provincia, ciudad, telefono, correo];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Cliente guardado" });
            }
            catch (error) {
                console.error("Error al crear cliente:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el cliente" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield database_1.default.query("SELECT * FROM cliente");
                res.json(cliente);
            }
            catch (error) {
                console.error("Error al listar clientes:", error);
                res.status(500).json({ error: "Ocurrió un error con los clientes" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM cliente WHERE id_cliente =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar el cliente:", error);
                res.status(500).json({ error: "Ocurrió un error al listar el cliente de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE cliente SET cedula=$1, nombre=$2, apellido=$3, fecha_nacimiento=$4, provincia=$5, ciudad=$6, telefono=$7, correo=$8 WHERE id_cliente=$9";
            const { cedula, nombre, apellido, fecha_nacimiento, provincia, ciudad, telefono, correo } = req.body;
            const params = [cedula, nombre, apellido, fecha_nacimiento, provincia, ciudad, telefono, correo, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "Cliente actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el cliente:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el cliente de id: " + req.params.id });
            }
        });
    }
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM cliente WHERE id_cliente=$1", [req.params.id]);
            res.json({ Text: `Eliminando el cliente de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el cliente de id " + req.params.id });
        }
    }
}
const clienteController = new ClienteController();
exports.default = clienteController;

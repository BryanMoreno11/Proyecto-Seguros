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
class SeguroVehiculoController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_aseguradora_vehiculo, id_vehiculo, descuento, precio } = req.body;
            try {
                const queryText = "INSERT INTO seguro_vehiculo (  id_aseguradora_vehiculo,id_vehiculo,descuento,precio ) VALUES ($1, $2, $3, $4)";
                const queryParams = [id_aseguradora_vehiculo, id_vehiculo, descuento, precio];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "Seguro de vehículo guardado" });
            }
            catch (error) {
                console.error("Error al crear seguro:", error);
                res.status(500).json({ error: "Ocurrió un error al crear el seguro de automóvil" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seguros = yield database_1.default.query("SELECT * FROM vista_seguro_vehiculo");
                res.json(seguros);
            }
            catch (error) {
                console.error("Error al listar seguros de automóvil:", error);
                res.status(500).json({ error: "Ocurrió un error al listar los seguros de automóviles" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM seguro_vehiculo WHERE id_seguro_vehiculo =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar seguro de automóvil", error);
                res.status(500).json({ error: "Ocurrió un error al listar el seguro de automóvil de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE seguro_vehiculo SET id_aseguradora_vehiculo=$1, id_vehiculo=$2, descuento=$3, precio=$4 WHERE id_seguro_vehiculo=$5";
            const { id_aseguradora_vehiculo, id_vehiculo, descuento, precio } = req.body;
            const params = [id_aseguradora_vehiculo, id_vehiculo, descuento, precio, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "seguro de automóvil actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el seguro de automóvil:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el seguro de automóvil de id: " + req.params.id });
            }
        });
    }
    //-Eliminar
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM seguro_vehiculo WHERE id_seguro_vehiculo=$1", [req.params.id]);
            res.json({ Text: `Eliminado el seguro de vehículo de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el seguro de vehículo de id " + req.params.id });
        }
    }
}
const seguroVehiculoController = new SeguroVehiculoController();
exports.default = seguroVehiculoController;

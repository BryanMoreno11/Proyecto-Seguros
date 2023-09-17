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
class VehiculoController {
    //Métodos CRUD
    //---Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_modelo, id_anio, valor_mercado, valor_cotizacion } = req.body;
            try {
                const queryText = "INSERT INTO vehiculo (  id_modelo, id_anio,valor_mercado, valor_cotizacion ) VALUES ($1, $2, $3, $4)";
                const queryParams = [id_modelo, id_anio, valor_mercado, valor_cotizacion];
                const result = yield database_1.default.query(queryText, queryParams);
                res.json({ text: "vehículo guardado" });
            }
            catch (error) {
                console.error("Error al crear vehículo:", error);
                res.status(500).json({ error: "Ocurrió un error al crear vehículo" });
            }
        });
    }
    //---Listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculos = yield database_1.default.query("SELECT * FROM vista_vehiculo order by id_vehiculo asc");
                res.json(vehiculos);
            }
            catch (error) {
                console.error("Error al listar vehículos:", error);
                res.status(500).json({ error: "Ocurrió un error al listar los vehículos" });
            }
        });
    }
    //---Obtener
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const query = yield database_1.default.query("SELECT * FROM vehiculo WHERE id_vehiculo =$1", [id]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al listar vehículo", error);
                res.status(500).json({ error: "Ocurrió un error al listar el vehículo de id: " + req.params.id });
            }
        });
    }
    //--Actualizar
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = "UPDATE vehiculo SET  id_modelo=$1, id_anio=$2, valor_mercado=$3, valor_cotizacion=$4 WHERE id_vehiculo=$5";
            const { id_modelo, id_anio, valor_mercado, valor_cotizacion } = req.body;
            const params = [id_modelo, id_anio, valor_mercado, valor_cotizacion, req.params.id];
            try {
                const query = yield database_1.default.query(text, params);
                res.json({ text: "automóvil actualizado correctamente" });
            }
            catch (error) {
                console.error("Error al actualizar el automóvil:", error);
                res.status(500).json({ error: "Ocurrió un error al actualizar el automóvil de id: " + req.params.id });
            }
        });
    }
    //-Eliminar
    delete(req, res) {
        try {
            database_1.default.query("DELETE FROM vehiculo WHERE id_vehiculo=$1", [req.params.id]);
            res.json({ Text: `Eliminado el vehículo de la id ${req.params.id}` });
        }
        catch (error) {
            res.status(500).json({ error: "No fue posible eliminar el vehículo de id " + req.params.id });
        }
    }
}
const vehiculoController = new VehiculoController();
exports.default = vehiculoController;

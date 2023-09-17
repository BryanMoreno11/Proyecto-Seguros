"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
//Importaciones de rutas
const aseguradorasAutomoviles_1 = __importDefault(require("./routes/aseguradorasAutomoviles"));
const anio_1 = __importDefault(require("./routes/anio"));
const aseguradorasVida_1 = __importDefault(require("./routes/aseguradorasVida"));
const seguroVehiculo_1 = __importDefault(require("./routes/seguroVehiculo"));
const vehiculo_1 = __importDefault(require("./routes/vehiculo"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const modelo_1 = __importDefault(require("./routes/modelo"));
const planVida_1 = __importDefault(require("./routes/planVida"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const clienteVehiculo_1 = __importDefault(require("./routes/clienteVehiculo"));
const cliente_Vida_1 = __importDefault(require("./routes/cliente_Vida"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //métodos
    config() {
        this.app.set('port', process.env.Port || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, express_1.urlencoded)({ extended: false }));
    }
    start() {
        this.app.listen(this.app.get('port'), () => { console.log("Server en el puerto ", this.app.get('port')); });
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/aseguradorasauto', aseguradorasAutomoviles_1.default);
        this.app.use('/api/anio', anio_1.default);
        this.app.use('/api/aseguradoravida', aseguradorasVida_1.default);
        this.app.use('/api/segurovehiculo', seguroVehiculo_1.default);
        this.app.use('/api/vehiculo', vehiculo_1.default);
        this.app.use('/api/modelo', modelo_1.default);
        this.app.use('/api/planVida', planVida_1.default);
        this.app.use('/api/cliente', cliente_1.default);
        this.app.use('/api/clienteVehiculo', clienteVehiculo_1.default);
        this.app.use('/api/clientevida', cliente_Vida_1.default);
    }
}
const server = new Server();
server.start();

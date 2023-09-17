import { Router } from "express";
import clienteVehiculoController from "../controllers/clienteVehiculoController";

class ClienteVehiculo{
    public router:Router=Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/', clienteVehiculoController.list);
        this.router.get('/:id', clienteVehiculoController.getOne);
        this.router.post('/',clienteVehiculoController.create);
        this.router.put('/:id',clienteVehiculoController.update);
        this.router.delete('/:id',clienteVehiculoController.delete);
    }
}

const clienteVehiculo = new ClienteVehiculo();
export default clienteVehiculo.router;
import { Router } from "express";
import seguroVehiculoController from "../controllers/seguroVehiculoController";
class SeguroVehiculo{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', seguroVehiculoController.list);
        this.router.get('/:id', seguroVehiculoController.getOne);
        this.router.post('/',seguroVehiculoController.create);
        this.router.put('/:id',seguroVehiculoController.update);
        this.router.delete('/:id',seguroVehiculoController.delete);
    }

}

const seguroVehiculo= new SeguroVehiculo();
export default seguroVehiculo.router;
import { Router } from "express";
import vehiculoController from "../controllers/vehiculoController";
class Vehiculo{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', vehiculoController.list);
        this.router.get('/:id', vehiculoController.getOne);
        this.router.post('/',vehiculoController.create);
        this.router.put('/:id',vehiculoController.update);
        this.router.delete('/:id',vehiculoController.delete);
    }

}

const vehiculo= new Vehiculo();
export default vehiculo.router;
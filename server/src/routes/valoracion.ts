import { Router } from "express";
import valoracionController from "../controllers/valoracion";
class Valoracion{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', valoracionController.list);
        this.router.post('/',valoracionController.create);
    }

}

const valoracion= new Valoracion();
export default valoracion.router;
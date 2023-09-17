import { Router } from "express";
import aseguradoraVidaController from "../controllers/aseguradoraVidaController";
class AseguradorasVida{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', aseguradoraVidaController.list);
        this.router.get('/:id', aseguradoraVidaController.getOne);
        this.router.post('/',aseguradoraVidaController.create);
        this.router.put('/:id',aseguradoraVidaController.update);
        this.router.delete('/:id',aseguradoraVidaController.delete);
    }

}

const aseguradorasVida= new AseguradorasVida();
export default aseguradorasVida.router;
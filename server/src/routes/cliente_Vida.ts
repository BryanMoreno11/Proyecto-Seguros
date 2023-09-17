import { Router } from "express";
import clienteVidaController from "../controllers/clienteVidaController";
class ClienteVida{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', clienteVidaController.list);
        this.router.get('/:id', clienteVidaController.getOne);
        this.router.post('/',clienteVidaController.create);
        this.router.put('/:id',clienteVidaController.update);
        this.router.delete('/:id',clienteVidaController.delete);
    }

}

const clienteVida= new ClienteVida();
export default clienteVida.router;
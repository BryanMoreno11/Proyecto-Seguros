import { Router } from "express";
import planVidaController from "../controllers/planVidaController";

class PlanVida{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', planVidaController.list);
        this.router.get('/:id', planVidaController.getOne);
        this.router.post('/',planVidaController.create);
        this.router.put('/:id',planVidaController.update);
        this.router.delete('/:id',planVidaController.delete);
    }
}

const planVida = new PlanVida();
export default planVida.router;
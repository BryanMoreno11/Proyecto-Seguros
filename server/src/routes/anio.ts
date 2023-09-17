import { Router } from "express";
import anioController from "../controllers/anioController";
class Anio{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', anioController.list);
        this.router.get('/:id', anioController.getOne);
        this.router.post('/',anioController.create);
        this.router.put('/:id',anioController.update);
        this.router.delete('/:id',anioController.delete);
    }

}

const anio= new Anio();
export default anio.router;
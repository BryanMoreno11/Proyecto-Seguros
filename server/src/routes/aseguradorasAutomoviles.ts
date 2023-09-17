import { Router } from "express";
import aseguradorasAutomovilesController from "../controllers/aseguradorasAutomovilesController";
class AseguradorasAutomoviles{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    
    config():void{

        this.router.get('/', aseguradorasAutomovilesController.list);
        this.router.get('/:id', aseguradorasAutomovilesController.getOne);
        this.router.post('/',aseguradorasAutomovilesController.create);
        this.router.put('/:id',aseguradorasAutomovilesController.update);
        this.router.delete('/:id',aseguradorasAutomovilesController.delete);
    }

}

const aseguradorasAutomoviles= new AseguradorasAutomoviles();
export default aseguradorasAutomoviles.router;
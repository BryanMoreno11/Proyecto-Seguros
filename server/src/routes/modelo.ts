import { Router } from "express";
import modeloController from '../controllers/modeloController';

class Modelo{
    public router:Router=Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/', modeloController.list);
        this.router.get('/:id', modeloController.getOne);
        this.router.post('/',modeloController.create);
        this.router.put('/:id',modeloController.update);
        this.router.delete('/:id',modeloController.delete);
    }
}

const modelo = new Modelo();
export default modelo.router;
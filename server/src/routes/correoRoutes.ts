import { Router } from "express";
import correoController from "../controllers/correoController";

class CorreoRoutes{
    public router:Router=Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.post('/', correoController.envioCorreo);
        this.router.post('/envioaseguradora/', correoController.envioCorreoAseguradora);
        this.router.post('/vida/',correoController.envioCorreoVida);
        this.router.post('/envioaseguradoravida/',correoController.envioCorreoAseguradoraVida);
    }
}

const correoRoutes = new CorreoRoutes();
export default correoRoutes.router;

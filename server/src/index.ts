import express, {Application, urlencoded} from 'express'
import indexRoutes from './routes/indexRoutes';
//Importaciones de rutas
import aseguradorasAutomoviles from './routes/aseguradorasAutomoviles';
import anio from './routes/anio';
import aseguradorasVida from './routes/aseguradorasVida';
import seguroVehiculo from './routes/seguroVehiculo';
import vehiculo from './routes/vehiculo';
import morgan from 'morgan'
import cors from 'cors'
import modelo from './routes/modelo';
import planVida from './routes/planVida';
import cliente from './routes/cliente';
import clienteVehiculo from './routes/clienteVehiculo';
import clienteVida from './routes/cliente_Vida';
import correoRoutes from './routes/correoRoutes';

class Server{
public app: Application
constructor (){

    this.app= express();
    this.config();
    this.routes();
}
//métodos
config():void{
this.app.set('port',process.env.Port || 3000);
this.app.use(morgan('dev'));
this.app.use(cors());
this.app.use(express.json());
this.app.use(urlencoded({extended:false}));
    
}

start():void{
this.app.listen(this.app.get('port'),()=>{console.log("Server en el puerto ",this.app.get('port'))});
}

routes():void{
    this.app.use(indexRoutes);
    this.app.use('/api/aseguradorasauto',aseguradorasAutomoviles);
    this.app.use('/api/anio', anio);
    this.app.use('/api/aseguradoravida', aseguradorasVida);
    this.app.use('/api/segurovehiculo', seguroVehiculo);
    this.app.use('/api/vehiculo', vehiculo);
    this.app.use('/api/modelo', modelo);
    this.app.use('/api/planVida', planVida);
    this.app.use('/api/cliente', cliente);
    this.app.use('/api/clienteVehiculo', clienteVehiculo);
    this.app.use('/api/clientevida', clienteVida);
    this.app.use('/api/envio',correoRoutes)

}



}
const server=new Server();
server.start();
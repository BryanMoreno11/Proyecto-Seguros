import { Component , OnInit} from '@angular/core';
import { AseguradoraVehiculoService } from '../../../services/aseguradora-vehiculo.service';

@Component({
  selector: 'app-admin-aseguradora-vehiculo',
  templateUrl: './admin-aseguradora-vehiculo.component.html',
  styleUrls: ['./admin-aseguradora-vehiculo.component.css']
})
export class AdminAseguradoraVehiculoComponent implements OnInit {
  aseguradorasautos:any=[];
  searchText:string="";
  
  constructor(private aseguradoraVehiculoService:AseguradoraVehiculoService){

  }

  ngOnInit():void{
    this.listarAseguradoraAuto();
 }

  listarAseguradoraAuto(){
    this.aseguradoraVehiculoService.getAseguradoras().subscribe(res=>{
      this.aseguradorasautos=res;
      console.log(this.aseguradorasautos);
    });
  
  }


  eliminarAseguradoraVida(id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este vehículo?");
  
    if (confirmacion) {
      this.aseguradoraVehiculoService.deleteAseguradora(id).subscribe(
        res => {
          window.alert("Vehículo eliminado exitosamente");
          this.listarAseguradoraAuto();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  reemplazarSaltosDeLinea(descripcion: string): string {
    return descripcion.replace(/\\n/g, '<br>');
  }

}

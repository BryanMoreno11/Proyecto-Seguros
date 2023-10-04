import { Component , OnInit} from '@angular/core';
import { AseguradoraVidaService } from 'src/app/services/aseguradora-vida.service';

@Component({
  selector: 'app-admin-aseguradora-vida',
  templateUrl: './admin-aseguradora-vida.component.html',
  styleUrls: ['./admin-aseguradora-vida.component.css']
})
export class AdminAseguradoraVidaComponent implements OnInit{
  
  aseguradorasvidas:any=[];
  searchText:string="";
  
  constructor(private aseguradoraVida_service:AseguradoraVidaService){

  }

  ngOnInit():void{
    this.listarAseguradoraVida();
 }

  listarAseguradoraVida(){
    this.aseguradoraVida_service.getAseguradoras().subscribe(res=>{
      this.aseguradorasvidas=res;
      console.log(this.aseguradorasvidas);
    });
  
  }


  eliminarAseguradoraVida(id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este vehículo?");
  
    if (confirmacion) {
      this.aseguradoraVida_service.deleteAseguradora(id).subscribe(
        res => {
          window.alert("Vehículo eliminado exitosamente");
          this.listarAseguradoraVida();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

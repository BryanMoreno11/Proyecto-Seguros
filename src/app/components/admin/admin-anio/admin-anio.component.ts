import { Component, OnInit } from '@angular/core';
import { AnioService } from 'src/app/services/anio.service';

@Component({
  selector: 'app-admin-anio',
  templateUrl: './admin-anio.component.html',
  styleUrls: ['./admin-anio.component.css']
})
export class AdminAnioComponent implements OnInit {

  anios: any=[];
  constructor(private anio_service: AnioService) { }

  ngOnInit() {
    this.listarAnios();
  }

  listarAnios(){
    this.anio_service.getAnios().subscribe(res=>{
      this.anios = res;
      console.log(this.anios);
    })
  }

  eliminarAnio(id:string){
    const confirmacion=confirm("¿Esta seguro que desea eliminar el año?");
    if(confirmacion){
      this.anio_service.deleteAnio(id).subscribe(res=>{
        window.alert("Año eliminado");
        this.listarAnios();
      },
      err=>{
        console.log(err);
      });
    }
  }

}

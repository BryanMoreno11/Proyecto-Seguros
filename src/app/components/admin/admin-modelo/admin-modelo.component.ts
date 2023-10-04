import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';


@Component({
  selector: 'app-admin-modelo',
  templateUrl: './admin-modelo.component.html',
  styleUrls: ['./admin-modelo.component.css']
})
export class AdminModeloComponent implements OnInit{
  
  modelos:any=[];
  searchText:string="";
  marcas:string[]=[];

  constructor(private modelo_service:ModeloService) { }
  
  ngOnInit(): void{
    this.listarModelos();
  }

  listarModelos(){
    this.modelo_service.getModelos().subscribe(res=>{
      this.modelos=res;
      this.obtenerMarcas();
    });
  }

  eliminarModelo(id: string){
    const confirmacion = confirm("¿Esta seguro de eliminar el modelo?");
    if(confirmacion){
      this.modelo_service.deleteModelo(id).subscribe(
        res =>{
          window.alert("Modelo eliminado");
          this.listarModelos();
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  obtenerMarcas(){
    this.marcas = Array.from(new Set(this.modelos.map((automovil:any) => automovil.marca)));
  }

}

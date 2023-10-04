import { Component, OnInit } from '@angular/core';
import { AutomovilesService, Vista_Automovil } from 'src/app/services/automoviles.service';
@Component({
  selector: 'app-admin-automovil',
  templateUrl: './admin-automovil.component.html',
  styleUrls: ['./admin-automovil.component.css']
})
export class AdminAutomovilComponent implements OnInit {
  //variables
  automoviles:any=[];
  searchText:string="";
  marcas:string[]=[];
  anios:string[]=[];
  seleccion={
    marca:"",
    anio:""
  }
  constructor(private automovil_service:AutomovilesService){
  }

  ngOnInit():void{
   this.listarAutomoviles();
}
//Métodos
eliminarAutomovil(id: string) {
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este vehículo?");

  if (confirmacion) {
    this.automovil_service.deleteAutomovil(id).subscribe(
      res => {
        window.alert("Vehículo eliminado exitosamente");
        this.listarAutomoviles();
      },
      err => {
        console.log(err);
      }
    );
  }
}


listarAutomoviles(){
  this.automovil_service.getAutomoviles().subscribe(res=>{
    this.automoviles=res;
    this.obtenerMarcas();
    this.obtenerAnios();
  });
}

obtenerMarcas(){
  this.marcas = Array.from(new Set(this.automoviles.map((automovil:Vista_Automovil) => automovil.marca)));
}

obtenerAnios(){
  this.seleccion.anio="";
  if(this.seleccion.marca==""){
     this.anios= Array.from(new Set(this.automoviles.map((automovil:Vista_Automovil)=> automovil.anio)));
  }else{
    this.anios = Array.from(new Set(this.automoviles
      .filter((automovil:Vista_Automovil)  => automovil.marca == this.seleccion.marca)
      .map((automovil:Vista_Automovil)  => automovil.anio)));
  }
  
}

setSearch(){

  this.searchText=this.seleccion.marca+" "+ this.seleccion.anio;
  console.log(this.searchText);
}

onSearchTextChange(newValue: string) {
   
  if (newValue === '') {
    this.seleccion.marca="";
    this.seleccion.anio="";
  }
}


}
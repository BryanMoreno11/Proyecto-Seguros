import { Component, OnInit } from '@angular/core';
import { AutomovilesService } from 'src/app/services/automoviles.service';
@Component({
  selector: 'app-admin-automovil',
  templateUrl: './admin-automovil.component.html',
  styleUrls: ['./admin-automovil.component.css']
})
export class AdminAutomovilComponent implements OnInit {
  //variables
  automoviles:any=[];

  constructor(private automovil_service:AutomovilesService){
  }

  ngOnInit():void{
   this.listarAutomoviles();
}
//Métodos
eliminarAutomovil(id:string){
this.automovil_service.deleteAutomovil(id).subscribe(
  res=>{window.alert("Vehiculo eliminado exitosamente");
this.listarAutomoviles();},
  err=>{console.log(err);}
);
}

listarAutomoviles(){
  this.automovil_service.getAutomoviles().subscribe(res=>{
    this.automoviles=res;
  });

}
}

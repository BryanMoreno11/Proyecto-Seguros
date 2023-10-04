import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient}from '@angular/common/http';
import { AseguradoraVehiculoService, Aseguradora_vehiculos } from 'src/app/services/aseguradora-vehiculo.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-edit-aseguradora-vehiculo',
  templateUrl: './admin-edit-aseguradora-vehiculo.component.html',
  styleUrls: ['./admin-edit-aseguradora-vehiculo.component.css']
})
export class AdminEditAseguradoraVehiculoComponent {

  edit:boolean=false;
  ase_vehi:any=[];
  asv:any=[];
  aseguradora_vehiculo: Aseguradora_vehiculos = {
  
    id_aseguradora_vehiculo: 0,
    nombre: "",
    correo: "",
    telefono: "", 
    descripcion: "",
    imagen: ""

  }

  constructor(private http:HttpClient, private aseguradoraVehiculoService:AseguradoraVehiculoService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    this.aseguradoraVehiculoService.getAseguradoras().subscribe(res=>{this.ase_vehi=res;});

    const params= this.activatedRoute.snapshot.params;
    if(params["id"]){
      this.aseguradoraVehiculoService.getAseguradora(params["id"]).subscribe(res=>{
        this.edit=true;
        this.asv=res;
        this.aseguradora_vehiculo=this.asv[0];
      })
    }
  }

  aseguradoraRepetida():boolean{
    let result=false;
    for(let asv of this.ase_vehi){
        if(asv.nombre == this.aseguradora_vehiculo.nombre){
            result=true;
            break;
        }
    }
    return result;
  }

  insertarAseVehi(forma:NgForm){
    if(!forma.valid){
       window.alert("Ingrese los datos solicitados correctamente");
    }
    else if(this.aseguradoraRepetida()==true){
     window.alert("Error!, ya existe la aseguradora de vehiculo que desea agregar");
    }
    else{
       this.aseguradoraVehiculoService.insertAseguradora(this.aseguradora_vehiculo).subscribe(res=>{window.alert("Aseguradora de vehiculo insertada exitosamente");
       this.router.navigate(['/admin/admin-aseguradora-vehiculo']);},
         err=>{console.log(err)});
    }
 }

 modificarAseVehi(forma:NgForm){
  if(!forma.valid){
    window.alert("Ingrese los datos solicitados correctamente");
 
 }else{
  this.aseguradoraVehiculoService.updateAseguradora(this.aseguradora_vehiculo.id_aseguradora_vehiculo,this.aseguradora_vehiculo).subscribe(
    res=>{window.alert("Aseguradora de vehiculo modificada exitosamente");
    this.router.navigate(['/admin/admin-aseguradora-vehiculo']);},
    err=>{console.log(err);}
  );
 }
}

}
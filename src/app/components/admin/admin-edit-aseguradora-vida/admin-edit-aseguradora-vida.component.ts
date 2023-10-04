import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient}from '@angular/common/http';
import { AseguradoraVidaService, Aseguradora_vida } from 'src/app/services/aseguradora-vida.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-aseguradora-vida',
  templateUrl: './admin-edit-aseguradora-vida.component.html',
  styleUrls: ['./admin-edit-aseguradora-vida.component.css']
})
export class AdminEditAseguradoraVidaComponent {

  edit:boolean=false;
  ase_vidas:any=[];
  asv:any=[];
  aseguradora_vida: Aseguradora_vida = {
  
    id_aseguradora_vida: 0,
    nombre: "",
    correo: "",
    telefono: "", 
    descripcion: "",
    imagen: ""

  }

  constructor(private http:HttpClient, private aseguradoraVidaService:AseguradoraVidaService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    this.aseguradoraVidaService.getAseguradoras().subscribe(res=>{this.ase_vidas=res;});

    const params= this.activatedRoute.snapshot.params;
    if(params["id"]){
      this.aseguradoraVidaService.getAseguradora(params["id"]).subscribe(res=>{
        this.edit=true;
        this.asv=res;
        this.aseguradora_vida=this.asv[0];
      })
    }
  }

  aseguradoraRepetida():boolean{
    let result=false;
    for(let asv of this.ase_vidas){
        if(asv.nombre == this.aseguradora_vida.nombre){
            result=true;
            break;
        }
    }
    return result;
  }

  insertarAseVida(forma:NgForm){
    if(forma.invalid){
       window.alert("Ingrese los datos solicitados correctamente");
    }
    else if(this.aseguradoraRepetida()==true){
     window.alert("Error!, ya existe la aseguradora de vida que desea agregar");
    }
    else{
       this.aseguradoraVidaService.insertAseguradora(this.aseguradora_vida).subscribe(res=>{window.alert("Aseguradora de vida insertada exitosamente");
       this.router.navigate(['/admin/admin-aseguradora-vida']);},
         err=>{console.log(err)});
    }
 }

 modificarAseVida(forma:NgForm){
  if(forma.invalid){
    window.alert("Ingrese los datos solicitados correctamente");
 
 }else{
  this.aseguradoraVidaService.updateAseguradora(this.aseguradora_vida.id_aseguradora_vida,this.aseguradora_vida).subscribe(
    res=>{window.alert("Aseguradora de vida modificada exitosamente");
    this.router.navigate(['/admin/admin-aseguradora-vida']);},
    err=>{console.log(err);}
  );
 }
}

}

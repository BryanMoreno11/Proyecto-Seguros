import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anio, AnioService } from 'src/app/services/anio.service';

@Component({
  selector: 'app-admin-edit-anio',
  templateUrl: './admin-edit-anio.component.html',
  styleUrls: ['./admin-edit-anio.component.css']
})
export class AdminEditAnioComponent implements OnInit {
  
  edit: boolean = false;
  anios: any=[];
  anios_aux: any=[];
  anio: Anio={
    id_anio:0,
    nombre: '',
    factor_riesgo:0
  }

  constructor(private http:HttpClient,private anio_service:AnioService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.anio_service.getAnios().subscribe(res=>{
      this.anios=res;
    })
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.anio_service.getAnio(params["id"]).subscribe(res=>{
        this.edit = true;
        this.anios_aux =res;
        this.anio = this.anios_aux[0];
      })
    }
  }

  insertarAnio(forma:NgForm){
    if(forma.invalid){
      window.alert('Ingrese correctamente los datos')
    }
    else if(this.anioRepetido()==true){
      window.alert('Error, ya existe el año que desea agregar');
    }
    else{
      this.anio_service.insertAnio(this.anio).subscribe(res=>{
        window.alert('Año insertado exitosamente');
        this.router.navigate(['/admin/admin-anio'])},
        err =>{console.log(err)});
    }
  }

  modificarAnio(forma:NgForm){
    if(forma.invalid){
      window.alert('Ingrese correctamente los datos')
    }
    else if(this.anioRepetido()==true){
      window.alert('Error, ya existe el año que desea agregar');
    }
    else{
      this.anio_service.updateAnio(this.anio.id_anio,this.anio).subscribe(res=>{
        window.alert('Año modificado exitosamente');
        this.router.navigate(['/admin/admin-anio'])},
        err =>{console.log(err)});
    }
  }

  anioRepetido():boolean{
    let resul = false;
    for(let ann of this.anios){
      if(ann.id_anio!=this.anio.id_anio && ann.nombre == this.anio.nombre && ann.factor_riesgo == this.anio.factor_riesgo){
        resul = true;
        break;
      }
    }
    return resul;
  }

}

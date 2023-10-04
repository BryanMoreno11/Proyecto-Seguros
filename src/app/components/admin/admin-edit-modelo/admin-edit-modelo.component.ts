import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelo } from 'src/app/services/modelo.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-modelo',
  templateUrl: './admin-edit-modelo.component.html',
  styleUrls: ['./admin-edit-modelo.component.css']
})
export class AdminEditModeloComponent implements OnInit {
  
  edit:boolean = false;
  modelos: any=[];
  modelos_aux: any=[];
  modelo: Modelo={
    id_modelo:0,
    nombre:'',
    marca: '',
    factor_riesgo: 0
  }

  constructor(private http:HttpClient, private modelo_service:ModeloService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit():void{
    this.modelo_service.getModelos().subscribe(res=>{this.modelos=res;});

    const params = this.activatedRoute.snapshot.params;
    if(params["id"]){
      this.modelo_service.getModelo(params["id"]).subscribe(res=>{
        this.edit = true;
        this.modelos_aux = res;
        this.modelo = this.modelos_aux[0];
      })
    }
  }

  insertarModelo(forma:NgForm){
    if(forma.invalid
      ){
        window.alert('Ingrese correctamente los datos')
    }
    else if(this.modeloRepetido()==true){
      window.alert('Error, ya existe el modelo que desea agregar');
    }
    else{
      this.modelo_service.insertModelo(this.modelo).subscribe(res=>{
        window.alert('Modelo insertado exitosamente');this.router.navigate(['/admin/admin-modelo'])},
        err => {console.log(err)});
      
    }
  }

  modificarModelo(forma:NgForm){
    if(forma.invalid){
        window.alert('Ingrese correctamente los datos')
    }
    else if(this.modeloRepetido()==true){
      window.alert('Error, ya existe el modelo que desea agregar');
    }
    else{
      this.modelo_service.updateModelo(this.modelo.id_modelo,this.modelo).subscribe(res=>{
        window.alert('Modelo insertado exitosamente');this.router.navigate(['/admin/admin-modelo'])},
        err => {console.log(err)});
      
    }
  }

  modeloRepetido():boolean{
    let resul = false;
    for (let mod of this.modelos){
      if(mod.id_modelo!=this.modelo.id_modelo && mod.nombre == this.modelo.nombre && mod.marca == this.modelo.marca &&
        mod.factor_riesgo == this.modelo.factor_riesgo){
          resul = true;
          break;
        }
    }
    return resul;
  }



}

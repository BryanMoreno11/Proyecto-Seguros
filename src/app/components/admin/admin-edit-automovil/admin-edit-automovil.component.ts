import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnioService } from 'src/app/services/anio.service';
import { AutomovilesService, Automovil } from 'src/app/services/automoviles.service';
import { ModeloService,Modelo } from 'src/app/services/modelo.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-edit-automovil',
  templateUrl: './admin-edit-automovil.component.html',
  styleUrls: ['./admin-edit-automovil.component.css']
})
export class AdminEditAutomovilComponent implements OnInit {
  //variables
  edit:boolean=false;
  marcas:string[]=[];
  modelos:any=[];
  automoviles:any=[];
  auto:any=[];
  anios:any=[];
  modelos_filtro:any=[];
  marca_auto="";
  automovil:Automovil={
    id_vehiculo:0,
    id_modelo:0,
    id_anio:0,
    valor_mercado:"",
    valor_cotizacion:0
  };
 //Constructor
  constructor(private modelo_service:ModeloService, private automovil_service:AutomovilesService, private anio_service:AnioService,
    private router:Router, private activatedRoute:ActivatedRoute){
      
  }
  //OnInit
  ngOnInit():void{
    this.automovil_service.getAutomoviles().subscribe(res=>{this.automoviles=res;
    });
     this.modelo_service.getModelos().subscribe(res=>{this.modelos=res;
      if(params["id"]){
        this.automovil_service.getAutomovil(params["id"]).subscribe(res=>{
          this.edit=true;
          this.auto=res;
          this.automovil=this.auto[0];
          this.getMarca();
          this.getModelos();
        },
        err=>{console.log(err)});
      }
     this.getMarcas();});
     this.anio_service.getAnios().subscribe(res=>{this.anios=res;
     });
     //Modificar
    const params= this.activatedRoute.snapshot.params;
    
  }

  //Métodos
  getMarcas(){
    this.marcas= this.modelos.map((modelo:Modelo)=>modelo.marca);
    const dataArr = new Set(this.marcas);
    this.marcas = [...dataArr];
    }

    getMarca(){
      let modelo=this.modelos.filter((modelo:Modelo)=>modelo.id_modelo==this.automovil.id_modelo);
      this.marca_auto= modelo.map((modelo:Modelo)=>modelo.marca);
    }

    getModelos(){
      if (this.marca_auto==""){
        this.automovil.id_modelo=0;
      }
      console.log("la marca es",this.marca_auto);
      console.log("el modelos es",this.automovil.id_modelo);
      
      this.modelos_filtro=[];
      for(let modelo of this.modelos){
          if(modelo.marca==this.marca_auto){
            this.modelos_filtro.push(modelo);
          }
      }
    }

    calcularCotizacion(){
      let anioRiesgo:any;
      let modeloRiesgo:any;
      let resultado;
      for(let anio of this.anios){
          if(anio.id_anio== this.automovil.id_anio){
            anioRiesgo=anio.factor_riesgo;
            break;
          }
      }

      for(let modelo of this.modelos){
        if(modelo.id_modelo== this.automovil.id_modelo){
          modeloRiesgo=modelo.factor_riesgo;
          break;
        }
    }
    resultado=this.automovil.valor_mercado*anioRiesgo*modeloRiesgo;
    this.automovil.valor_cotizacion=Math.round(resultado*100)/100;
    }
    insertarAutomovil(){
      console.log(this.automovil.valor_cotizacion);
     if(this.automovil.id_modelo==0 || this.automovil.id_anio==0 || this.automovil.valor_mercado==0 || this.automovil.valor_cotizacion<=0
      || Number.isNaN(this.automovil.valor_cotizacion) ){
        window.alert("Ingrese los datos solicitados correctamente");
     }
     else if(this.automovilRepetido()==true){
      window.alert("Error!, ya existe el vehículo que desea agregar");
     }
     
     else{
        this.automovil_service.insertAutomovil(this.automovil).subscribe(res=>{window.alert("Vehiculo insertado exitosamente");
      this.router.navigate(['/admin-automovil']);},
          err=>{console.log(err)});
     }
    }

    modificarAutomovil(){
      if(this.automovil.id_modelo==0 || this.automovil.id_anio==0 || this.automovil.valor_mercado==0 || this.automovil.valor_cotizacion<=0
        || Number.isNaN(this.automovil.valor_cotizacion)){
        window.alert("Ingrese los datos solicitados correctamente");
     }else if(this.automovilRepetido()==true){
      window.alert("Error!, ya existe el vehículo que desea agregar");
     }
     else{
      this.automovil_service.updateAutomovil(this.automovil.id_vehiculo,this.automovil).subscribe(
        res=>{window.alert("Vehiculo modificado exitosamente");
        this.router.navigate(['/admin-automovil']);},
        err=>{console.log(err);}
      );
     }
    }

    automovilRepetido():boolean{
      let result=false;
      for(let auto of this.automoviles){
          if(auto.id_vehiculo!= this.automovil.id_vehiculo && auto.id_modelo==this.automovil.id_modelo
            && auto.id_anio==this.automovil.id_anio ){
              result=true;
              break;
          }
      }
      return result;
    }
}

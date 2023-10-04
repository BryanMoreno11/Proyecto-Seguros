import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../services/modelo.service';
import { AutomovilesService } from 'src/app/services/automoviles.service';
import { SeguroVehiculoService } from '../../services/seguro-vehiculo.service';
import { ClienteVehiculoService } from 'src/app/services/cliente-vehiculo.service';





@Component({
  selector: 'app-planes-automoviles',
  templateUrl: './planes-automoviles.component.html',
  styleUrls: ['./planes-automoviles.component.css']
})
export class PlanesAutomovilesComponent  implements OnInit  {
  //Atributos
  modelos:string[]=[];
  marcas:string[]=[];
  anios:string[]=[];
  automoviles:Auto[]=[];
  seguros:any=[];
  segurosFiltro:any=[];
  automovil={
    marca:"",
    modelo:"",
    anio:""
  };
  
  
 //Métodos
  constructor(private modelo_service:ModeloService, private automovi_service:AutomovilesService, private seguro_service:
    SeguroVehiculoService, private cliente_vehiculo_service:ClienteVehiculoService){

  }

 
  
  ngOnInit():void{
    
    this.seguro_service.getSeguros().subscribe(res=>{
      this.seguros=res;
      this.getAutos();
      this.getMarcas();
    });
  }

  getAutos(){
    for(let seguro of this.seguros){
      this.automoviles.push({marca:seguro.marca, modelo:seguro.modelo,anio:seguro.anio});
    }
    const dataArr = new Set(this.automoviles);
    this.automoviles = [...dataArr];
  }
  
  getMarcas(){
    this.marcas= this.automoviles.map(auto=>auto.marca);
    const dataArr = new Set(this.marcas);
    this.marcas = [...dataArr];
    }
  
    getModelosMarca(){
      this.anios=[];
      this.modelos=[];
      for(let auto of this.automoviles){
        if(auto.marca===this.automovil.marca){
          this.modelos.push(auto.modelo);
        }
      }
      const dataArr = new Set(this.modelos);
      this.modelos = [...dataArr];
    }

    getAnios(){
      this.anios=[];
      for(let automovil of this.automoviles){
        if(automovil.modelo===this.automovil.modelo){
          this.anios.push(automovil.anio);
        }
      }
      const dataArr = new Set(this.anios);
      this.anios = [...dataArr];
    }

    getSeguros(){
      this.segurosFiltro=[];
      for(let seguro of this.seguros){
          if(seguro.modelo=== this.automovil.modelo && seguro.anio===this.automovil.anio){
              this.segurosFiltro.push(seguro);
          }

      }
    }

    reemplazarSaltosDeLinea(descripcion: string): string {
      return descripcion.replace(/\\n/g, '<br>');
    }

    setEstado(){

      this.cliente_vehiculo_service.estado=true;
    }
  }

  export interface Auto{
    marca:string;
    modelo:string;
    anio:string;
  }

  





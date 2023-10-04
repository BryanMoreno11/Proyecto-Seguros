import { Component, OnInit } from '@angular/core';

import { AseguradoraVehiculoService, Aseguradora_vehiculos } from 'src/app/services/aseguradora-vehiculo.service';
import { AutomovilesService, Automovil } from 'src/app/services/automoviles.service';
import { SeguroVehiculoService,Seguro_Vehiculo } from 'src/app/services/seguro-vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-admin-edit-seguro-vehiculo',
  templateUrl: './admin-edit-seguro-vehiculo.component.html',
  styleUrls: ['./admin-edit-seguro-vehiculo.component.css']
})
export class AdminEditSeguroVehiculoComponent implements OnInit {
edit: boolean=false;
aseguradoras: any = [];
automoviles: any = [];
seguro: any=[];
seguroVehiculo:Seguro_Vehiculo={
id_seguro_vehiculo:0,
id_aseguradora_vehiculo:0,
id_vehiculo:0,
descuento:"",
precio:-1
};
  constructor(
    private aseguradoraService: AseguradoraVehiculoService,
    private automovilesService: AutomovilesService, private seguro_vehiculo:SeguroVehiculoService, private activateroute:ActivatedRoute, private router:Router
  ) {}

  ngOnInit() {
    const params= this.activateroute.snapshot.params;
    // Cargar datos de aseguradoras
    this.aseguradoraService.getAseguradoras().subscribe(res => {
      this.aseguradoras = res;
      console.log(this.aseguradoras);
    });

    // Cargar datos de automóviles
    this.automovilesService.getAutomoviles().subscribe(res => {
      this.automoviles = res;
    });
    
    if(params['id']){
      this.seguro_vehiculo.getSeguro(params["id"]).subscribe(res=>{
      this.edit=true;
      this.seguro=res;
      this.seguroVehiculo=this.seguro[0];
      })
    
    
    }

    
  }

  insertarSeguro(forma:NgForm) {
    if(forma.invalid){
      window.alert("Ingrese correctamente los datos");
    }else{
      this.seguro_vehiculo.insertSeguro(this.seguroVehiculo).subscribe(res=>{window.alert("Segur-vehiculo aprobado");
      this.router.navigate(['/admin/admin-seguro-vehiculo']);},
       err=>{console.log()});
    }
    
    }

  modificarSeguro(forma:NgForm){
    if(forma.invalid){
      window.alert("Ingrese correctamente los datos");
    }else{
      this.seguro_vehiculo.updateSeguro(this.seguroVehiculo.id_seguro_vehiculo,this.seguroVehiculo).subscribe(
        res=>{window.alert("seguro-vehiculo modificado exitosamente");
        this.router.navigate(['/admin/admin-seguro-vehiculo']);},
        err=>{console.log(err);});
    }
    }
  
    calcularPrecio(){
    if(this.seguroVehiculo.descuento!="" && this.seguroVehiculo.descuento>=0){
      let descuento=this.seguroVehiculo.descuento/100;
      let precio_base:number=0;
      for(let automovil of this.automoviles){
        if(automovil.id_vehiculo==this.seguroVehiculo.id_vehiculo){
              precio_base= automovil.valor_cotizacion;
              
              break;
        }

      }
      let resultado=precio_base-(precio_base*descuento);
      this.seguroVehiculo.precio= Math.round(resultado*100)/100;
    }else{
      this.seguroVehiculo.precio=-1;
    }
    }
  
  
  
}

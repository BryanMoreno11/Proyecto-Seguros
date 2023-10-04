import { Component } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import { PlanVida } from 'src/app/services/plan-vida.service';
import { PlanVidaService } from 'src/app/services/plan-vida.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-edit-plan-vida',
  templateUrl: './admin-edit-plan-vida.component.html',
  styleUrls: ['./admin-edit-plan-vida.component.css']
})
export class AdminEditPlanVidaComponent {

  edit:boolean=false;
  aseguradoras:any=[];
  aseguradora_nombre="";
  planesVida:any=[];
  plan: any=[];
  planVida:PlanVida={
    id_plan_vida:0,
    id_aseguradora_vida:0,
    nombre: "",
    descripcion:"",
    precio:""
  };

  constructor(private http:HttpClient, private plan_vida_service:PlanVidaService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
   
    this.listarAseguradoras();
    this.plan_vida_service.getPlanesVida().subscribe(res=>{this.planesVida=res;
    });

    const params= this.activatedRoute.snapshot.params;
    if(params["id"]){
      this.plan_vida_service.getPlanVida(params["id"]).subscribe(res=>{
        this.edit=true;
        this.plan=res;
        this.planVida=this.plan[0];
      })
    }
  }

  listarAseguradoras(){
    this.getAseguradoras().subscribe(res=>{
      this.aseguradoras=res;
    });
  }

  insertarPlanVida(forma:NgForm){

     if(forma.invalid){
        window.alert("Ingrese los datos solicitados correctamente");
     }
     else if(this.planVidaRepetido()==true){
      window.alert("Error!, ya existe el plan de vida que desea agregar");
     }
     else{
        this.plan_vida_service.insertPlanVida(this.planVida).subscribe(res=>{window.alert("Plan de vida insertado exitosamente");
        this.router.navigate(['/admin/admin-plan-vida']);},
          err=>{console.log(err)});
     }
  }

  modificarPlanVida(forma:NgForm){
    if(forma.invalid){
      window.alert("Ingrese los datos solicitados correctamente");
   }
   else if(this.planVidaRepetido()==true){
    window.alert("Error!, ya existe el plan de vida que desea agregar");
   }
   else{
    this.plan_vida_service.updatePlanVida(this.planVida.id_plan_vida,this.planVida).subscribe(
      res=>{window.alert("Plan de vida modificado exitosamente");
      this.router.navigate(['/admin/admin-plan-vida']);},
      err=>{console.log(err);}
    );
   }
  }

  planVidaRepetido():boolean{
    let result=false;
    for(let plan of this.planesVida){
        if(plan.id_plan_vida!= this.planVida.id_plan_vida && plan.plan_vida_nombre == this.planVida.nombre && 
          plan.id_aseguradora_vida== this.planVida.id_aseguradora_vida){
            result=true;
            break;
        }
    }
    return result;
  }

  getAseguradoras(){
    return this.http.get(`http://localhost:3000/api/aseguradoravida`);
    }

    getAseguradora(id:string){
      return this.http.get(`http://localhost:3000/api/aseguradoravida/${id}`);
      }
}

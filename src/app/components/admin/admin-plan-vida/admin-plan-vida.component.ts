import { Component } from '@angular/core';
import { PlanVidaService, PlanVida, Vista_PlanVida } from 'src/app/services/plan-vida.service';

@Component({
  selector: 'app-admin-plan-vida',
  templateUrl: './admin-plan-vida.component.html',
  styleUrls: ['./admin-plan-vida.component.css']
})
export class AdminPlanVidaComponent {
  //variables
  planesVida:any=[];
  searchText:string="";
  aseguradoras:string[]=[];

  constructor(private plan_vida_service:PlanVidaService){
  }

  ngOnInit():void{
    this.listarPlanesVida();
    console.log(this.planesVida);
 }


  listarPlanesVida(){
    this.plan_vida_service.getPlanesVida().subscribe(res=>{
      this.planesVida=res;
      this.obtenerAseguradoras();
    });
  }

  eliminarPlanVida(id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este plan de vida?");
  
    if (confirmacion) {
      this.plan_vida_service.deletePlanVida(id).subscribe(
        res => {
          window.alert("Plan de vida eliminado exitosamente");
          this.listarPlanesVida();
          console.log(this.aseguradoras);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  obtenerAseguradoras(){
    this.aseguradoras = Array.from(new Set(this.planesVida.map((seguro:Vista_PlanVida) => seguro.aseguradora_nombre)));
  }
  

}
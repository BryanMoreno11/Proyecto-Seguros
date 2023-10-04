import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanVidaService {

  constructor(private http: HttpClient) { }

  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

  getPlanesVida(){
    return this.http.get(`${this.API_URL}planvida`);
  }

  getPlanVida(id:string){
    return this.http.get(`${this.API_URL}planvida/${id}`);
  }
  //Delete
  deletePlanVida(id:string){
    return this.http.delete(`${this.API_URL}planvida/${id}`);
  }
  //Insert
  insertPlanVida(planvida:PlanVida){
    return this.http.post(`${this.API_URL}planvida`,planvida);
  }
  //Update
  updatePlanVida(id:string|number, planVida:PlanVida){
    return this.http.put(`${this.API_URL}planvida/${id}`,planVida);
  }
}

export interface PlanVida{
  id_plan_vida:number;
  id_aseguradora_vida:number;
  nombre:string;
  descripcion: string;
  precio:any;
}

export interface Vista_PlanVida{
  aseguradora_nombre:string;
  plan_vida_nombre:string;
}

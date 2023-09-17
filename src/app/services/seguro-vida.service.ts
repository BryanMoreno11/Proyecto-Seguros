import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguroVidaService {

  API_URL= 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  getSeguros(){
    return this.http.get(`${this.API_URL}planVida`);

  }
  //Get
  getSeguro(id:string){
    return this.http.get(`${this.API_URL}planVida/${id}`);
  }
  //Delete
  deleteSeguro(id:string){
    return this.http.delete(`${this.API_URL}planVida/${id}`);
  }
  //Insert
  insertSeguro(seguro:Seguro_Vida){
    return this.http.post(`${this.API_URL}planVida`,seguro);
  }
  //Update
  updateModelo(id:string, seguro:Seguro_Vida){
    return this.http.put(`${this.API_URL}planVida/${id}`,seguro);
  }
}
export interface Seguro_Vida{
  id_plan_vida:number;
  id_aseguradora_vida:number;
  aseguradora_nombre:string;
  aseguradora_imagen:string;
  plan_vida_nombre:string;
  plan_vida_descripcion:string;
  precio:number;
  }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ModeloService {
  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';


  constructor(private http:HttpClient) { }
  
  //-------------------------Métodos---------------------------
  //List
  getModelos(){
    return this.http.get(`${this.API_URL}modelo`);

  }
  //Get
  getModelo(id:string){
    return this.http.get(`${this.API_URL}modelo/${id}`);
  }
  //Delete
  deleteModelo(id:string){
    return this.http.delete(`${this.API_URL}modelo/${id}`);
  }
  //Insert
  insertModelo(modelo:Modelo){
    return this.http.post(`${this.API_URL}modelo`,modelo);
  }
  //Update
  updateModelo(id:string|number, modelo:Modelo){
    return this.http.put(`${this.API_URL}modelo/${id}`,modelo);
  }
}

export interface Modelo{
  id_modelo:number;
  nombre: string;
  marca: string;
  factor_riesgo:number;
}
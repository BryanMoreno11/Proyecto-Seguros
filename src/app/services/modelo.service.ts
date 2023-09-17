import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ModeloService {
  API_URL= 'http://localhost:3000/api/';


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
  updateModelo(id:string, modelo:Modelo){
    return this.http.put(`${this.API_URL}modelo/${id}`,modelo);
  }
}

export interface Modelo{
  id_modelo:number;
  nombre: string;
  marca: string;
  precio:number;
}

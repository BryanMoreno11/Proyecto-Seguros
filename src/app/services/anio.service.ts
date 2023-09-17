import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnioService {
  
  API_URL= 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  //-------------------------Métodos---------------------------
  //List
  getAnios(){
    return this.http.get(`${this.API_URL}anio`);

  }
  
  //Get
  getAnio(id:string){
    return this.http.get(`${this.API_URL}anio/${id}`);
  }
  //Delete
  deleteAnio(id:string){
    return this.http.delete(`${this.API_URL}anio/${id}`);
  }
  //Insert
  insertAnio(anio:Anio){
    return this.http.post(`${this.API_URL}anio`,anio);
  }
  //Update
  updateAnio(id:string, anio:Anio){
    return this.http.put(`${this.API_URL}anio/${id}`,anio);
  }
  
  
}

export interface Anio{
id_anio:number;
nombre:string;
factor_riesgo:number;

}

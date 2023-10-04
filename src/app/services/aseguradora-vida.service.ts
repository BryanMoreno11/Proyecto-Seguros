import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraVidaService {

  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

  constructor(private http:HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  
  getAseguradoras(){
    return this.http.get(`${this.API_URL}aseguradoravida`);

  }
  //Get
  getAseguradora(id:string){
    return this.http.get(`${this.API_URL}aseguradoravida/${id}`);
  }
  //Delete
  deleteAseguradora(id:string){
    return this.http.delete(`${this.API_URL}aseguradoravida/${id}`);
  }
  //Insert
  insertAseguradora(aseguradora:Aseguradora_vida){
    return this.http.post(`${this.API_URL}aseguradoravida`,aseguradora);
  }
  //Update
  updateAseguradora(id:string|number, aseguradora:Aseguradora_vida){
    return this.http.put(`${this.API_URL}aseguradoravida/${id}`,aseguradora);
  }
}
export interface Aseguradora_vida{
  id_aseguradora_vida:number;
  nombre:string;
  correo:string;
  telefono:string;
  descripcion:string;
  imagen:string;
  }

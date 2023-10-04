import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraVehiculoService {
  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

  constructor(private http:HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  
  getAseguradoras(){
    return this.http.get(`${this.API_URL}aseguradorasauto`);

  }
  //Get
  getAseguradora(id:string){
    return this.http.get(`${this.API_URL}aseguradorasauto/${id}`);
  }
  //Delete
  deleteAseguradora(id:string){
    return this.http.delete(`${this.API_URL}aseguradorasauto/${id}`);
  }
  //Insert
  insertAseguradora(aseguradora:Aseguradora_vehiculos){
    return this.http.post(`${this.API_URL}aseguradorasauto`,aseguradora);
  }
  //Update
  updateAseguradora(id:string|number, aseguradora:Aseguradora_vehiculos){
    return this.http.put(`${this.API_URL}aseguradorasauto/${id}`,aseguradora);
  }
}
export interface Aseguradora_vehiculos{
  id_aseguradora_vehiculo:number;
  nombre:string;
  correo:string;
  telefono:string;
  descripcion:string;
  imagen:string;
  }
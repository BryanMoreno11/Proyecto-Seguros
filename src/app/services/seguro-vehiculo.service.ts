import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SeguroVehiculoService {

  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';


  constructor(private http:HttpClient) { }
  
  //-------------------------Métodos---------------------------
  //List
  getSeguros(){
    return this.http.get(`${this.API_URL}segurovehiculo`);

  }
  //Get
  getSeguro(id:string){
    return this.http.get(`${this.API_URL}segurovehiculo/${id}`);
  }
  //Delete
  deleteSeguro(id:string){
    return this.http.delete(`${this.API_URL}segurovehiculo/${id}`);
  }
  //Insert
  insertSeguro(seguro:Seguro_Vehiculo){
    return this.http.post(`${this.API_URL}segurovehiculo`,seguro);
  }
  //Update
  updateSeguro(id:string|number, seguro:Seguro_Vehiculo){
    return this.http.put(`${this.API_URL}segurovehiculo/${id}`,seguro);
  }
  
}

export interface Seguro_Vehiculo{
id_seguro_vehiculo:number;
id_aseguradora_vehiculo:number;
id_vehiculo:number;
descuento:any;
precio:number;
}

export interface Vista_Seguro_Vehiculo{
  aseguradora:string;
}
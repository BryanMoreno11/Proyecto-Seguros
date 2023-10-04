import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomovilesService {
  
  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';


  constructor(private http: HttpClient) {}
  //-------------------------Métodos---------------------------
  //List
  getAutomoviles(){
    return this.http.get(`${this.API_URL}vehiculo`);

  }
  //Get
  getAutomovil(id:string){
    return this.http.get(`${this.API_URL}vehiculo/${id}`);
  }
  //Delete
  deleteAutomovil(id:string){
    return this.http.delete(`${this.API_URL}vehiculo/${id}`);
  }
  //Insert
  insertAutomovil(automovil:Automovil){
    return this.http.post(`${this.API_URL}vehiculo`,automovil);
  }
  //Update
  updateAutomovil(id:string|number, automovil:Automovil){
    return this.http.put(`${this.API_URL}vehiculo/${id}`,automovil);
  }
}

export interface Automovil{
  id_vehiculo:number;
  id_modelo:number;
  id_anio:number;
  valor_mercado:any;
  valor_cotizacion:number;
}

export interface Vista_Automovil{
  marca:string;
  anio:string;
}



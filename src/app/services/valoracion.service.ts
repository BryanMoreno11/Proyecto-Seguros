import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  API_URL= 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  //-------------------------Métodos---------------------------
  //List
  getValoraciones(){
    return this.http.get(`${this.API_URL}valoracion`);

  }
  
  insertValoracion(valoracion:Valoracion){
    return this.http.post(`${this.API_URL}valoracion`,valoracion);
  }
 
  
}

export interface Valoracion{
id_valoracion:number;
id_cliente:number|string;
valoracion:number;

}
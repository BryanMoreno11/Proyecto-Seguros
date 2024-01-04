import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

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
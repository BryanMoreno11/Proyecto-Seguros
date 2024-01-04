import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

  constructor(private http: HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  getClientes(){
    return this.http.get(`${this.API_URL}cliente`);

  }
  //Get
  getCliente(id:string){
    return this.http.get(`${this.API_URL}cliente/${id}`);
  }
  //Delete
  deleteCliente(id:string){
    return this.http.delete(`${this.API_URL}cliente/${id}`);
  }
  //Insert
  insertCliente(cliente:Cliente):Observable<Cliente>{
    return  this.http.post<Cliente>(`${this.API_URL}cliente`,cliente);
  }
  //Update
  updateCliente(id:string|number, cliente:Cliente){
    return this.http.put(`${this.API_URL}cliente/${id}`,cliente);
  }
}
export interface Cliente{
  id_cliente:number;
  cedula:string;
  nombre:string;
  apellido:string;
  fecha_nacimiento:Date;
  provincia:string;
  ciudad:string;
  telefono:string;
  correo:string;
}
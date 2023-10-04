import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteVidaService {
  //variables
   estado:boolean=false;

  API_URL= 'https://backend-tutorial-rxz2.onrender.com/api/';

  constructor(private http: HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  getClientes_Vida(){
    return this.http.get(`${this.API_URL}clientevida`);

  }
  //Get
  getCliente_Vida(id:string){
    return this.http.get(`${this.API_URL}clientevida/${id}`);
  }
  //Delete
  deleteCliente_Vida(id:string){
    return this.http.delete(`${this.API_URL}clientevida/${id}`);
  }
  //Insert
  insertCliente_Vida(cliente_vida:Cliente_Vida){
    return this.http.post(`${this.API_URL}clientevida`,cliente_vida);
  }
  //Update
  updateCliente_Vida(id:string|number, cliente_vida:Cliente_Vida){
    return this.http.put(`${this.API_URL}clientevida/${id}`,cliente_vida);
  }
}
export interface Cliente_Vida{
  id_cliente_vida:number;
  id_cliente:number;
  id_plan_vida:string|number;
  fecha:Date;
}

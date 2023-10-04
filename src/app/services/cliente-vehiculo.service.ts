import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteVehiculoService {

  //variables
  estado:boolean=false;

  API_URL= 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }
  //-------------------------Métodos---------------------------
  //List
  getClientes_Vehiculo(){
    return this.http.get(`${this.API_URL}clienteVehiculo`);

  }
  //Get
  getCliente_Vehiculo(id:string){
    return this.http.get(`${this.API_URL}clienteVehiculo/${id}`);
  }
  //Delete
  deleteCliente_Vehiculo(id:string){
    return this.http.delete(`${this.API_URL}clienteVehiculo/${id}`);
  }
  //Insert
  insertCliente_Vehiculo(cliente_vehiculo:Cliente_Vehiculo){
    return this.http.post(`${this.API_URL}clienteVehiculo`,cliente_vehiculo);
  }
  //Update
  updateCliente_Vehiculo(id:string|number, cliente_vehiculo:Cliente_Vehiculo){
    return this.http.put(`${this.API_URL}clienteVehiculo/${id}`,cliente_vehiculo);
  }
}
export interface Cliente_Vehiculo{
  id_cliente_vehiculo:number;
  id_cliente:number;
  id_seguro_vehiculo:string|number;
  fecha:Date;
}

export interface Vista_Cliente_Vehiculo{
  provincia:string;
  ciudad:string;
  fecha:Date;
}

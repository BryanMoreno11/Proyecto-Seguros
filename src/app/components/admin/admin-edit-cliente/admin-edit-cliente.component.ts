import { Component } from '@angular/core';
import { Cliente } from 'src/app/services/cliente.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient}from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-cliente',
  templateUrl: './admin-edit-cliente.component.html',
  styleUrls: ['./admin-edit-cliente.component.css']
})
export class AdminEditClienteComponent {

  edit:boolean=false;
  clientes:any=[];
  cli: any=[];
  cliente:Cliente={
    id_cliente: 0,
    cedula:"",
    nombre:"",
    apellido:"",
    fecha_nacimiento: new Date(),
    provincia: "",
    ciudad: "",
    telefono:"",
    correo:"",
  };

  constructor(private http:HttpClient, private clienteService:ClienteService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    this.clienteService.getClientes().subscribe(res=>{this.clientes=res;});

    const params= this.activatedRoute.snapshot.params;
    if(params["id"]){
      this.clienteService.getCliente(params["id"]).subscribe(res=>{
        this.edit=true;
        this.cli=res;
        this.cli[0].fecha_nacimiento = this.convertirFechaISOAFormato(this.cli[0].fecha_nacimiento);
        this.cliente=this.cli[0];
      })
    }
  }

  convertirFechaISOAFormato(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript van de 0 a 11
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  clienteRepetido():boolean{
    let result=false;
    for(let cli of this.clientes){
        if(cli.cedula == this.cliente.cedula && cli.id_cliente!= this.cliente.id_cliente){
            result=true;
            break;
        }
    }
    return result;
  }

  calcularEdad(){
    let hoy = new Date()
    const fechaNacimiento = new Date(this.cliente.fecha_nacimiento);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() -  fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }

  insertarCliente(forma:NgForm){
    if(forma.invalid){
       window.alert("Ingrese los datos solicitados correctamente");
    }
    else if(this.calcularEdad()<18){
      window.alert("Error!, el cliente debe de ser mayor de edad");

    }
    else if(this.clienteRepetido()==true){
     window.alert("Error!, ya existe el cliente que desea agregar");
    }
    else{
       this.clienteService.insertCliente(this.cliente).subscribe(res=>{window.alert("Cliente insertado exitosamente");
       this.router.navigate(['/admin/admin-cliente']);},
         err=>{console.log(err)});
    }
 }

 modificarCliente(forma:NgForm){
  if(forma.invalid){
    window.alert("Ingrese los datos solicitados correctamente");
 }else if(this.calcularEdad()<18){
  window.alert("Error!, el cliente debe de ser mayor de edad");

}
else if(this.clienteRepetido()==true){
 window.alert("Error!, ya existe el cliente que desea agregar");
}
 else{
  this.clienteService.updateCliente(this.cliente.id_cliente,this.cliente).subscribe(
    res=>{window.alert("Cliente modificado exitosamente");
    this.router.navigate(['/admin/admin-cliente']);},
    err=>{console.log(err);}
  );
 }
}
}
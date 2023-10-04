import { Component } from '@angular/core';
import { ClienteService, Cliente } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css']
})
export class AdminClienteComponent {
  
  clientes:any=[];
  provincias:string[]=[];
  ciudades:string[]=[];
  searchText:string="";
  //objetos
  seleccion={
    provincia:"",
    ciudad:""
  }

  constructor (private clienteService:ClienteService){}

  ngOnInit():void{
    this.listarClientes();
    console.log(this.clientes);
  }

  listarClientes(){
    this.clienteService.getClientes().subscribe(res=>{
      this.clientes=res;
      this.obtenerProvincias();
      this.obtenerCiudades();
    });
  }

  eliminarCliente(id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este cliente?");
  
    if (confirmacion) {
      this.clienteService.deleteCliente(id).subscribe(
        res => {
          window.alert("Cliente eliminado exitosamente");
          this.listarClientes();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  obtenerProvincias(){
    this.provincias = Array.from(new Set(this.clientes.map((cliente:Cliente) => cliente.provincia)));
  }

  obtenerCiudades(){
    this.seleccion.ciudad="";
    if(this.seleccion.provincia==""){
       this.ciudades= Array.from(new Set(this.clientes.map((cliente:Cliente)=> cliente.ciudad)));
    }else{
      this.ciudades = Array.from(new Set(this.clientes
        .filter((cliente:Cliente)  => cliente.provincia == this.seleccion.provincia)
        .map((cliente:Cliente)  => cliente.ciudad)));
    }
  }

  setSearch(){
    this.searchText=this.seleccion.provincia+" "+ this.seleccion.ciudad;
    console.log(this.searchText);
  }

  onSearchTextChange(newValue: string) {
   
    if (newValue === '') {
      this.seleccion.provincia="";
      this.seleccion.ciudad="";
    }
  }









}

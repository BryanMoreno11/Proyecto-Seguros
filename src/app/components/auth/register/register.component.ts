import { Component, OnInit } from '@angular/core';
import { Cliente,ClienteService } from 'src/app/services/cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ClienteVehiculoService,Cliente_Vehiculo } from 'src/app/services/cliente-vehiculo.service';
import { ClienteVidaService, Cliente_Vida } from 'src/app/services/cliente-vida.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AseguradoraVehiculoService, Aseguradora_vehiculos } from 'src/app/services/aseguradora-vehiculo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //objetos
  cliente:Cliente = {
  id_cliente:0,
  cedula:"",
  nombre:"",
  apellido:"",
  fecha_nacimiento:new Date(),
  provincia:"",
  ciudad:"",
  telefono:"",
  correo:""
  };

  clienteVida:Cliente_Vida={
    id_cliente_vida:0,
    id_cliente:0,
    id_plan_vida:0,
    fecha: new Date()
    };

  aseguradora: Aseguradora_vehiculos={
      id_aseguradora_vehiculo:0,
      nombre:'',
      correo:'',
      telefono:'',
      descripcion:'prueba',
      imagen:'',
  }

  clienteVehiculo:Cliente_Vehiculo={
      id_cliente_vehiculo:0,
      id_cliente:0,
      id_seguro_vehiculo:0,
      fecha: new Date()
   }
   //variables
   aseguradora_aux: any=[];
  ciudades: string[] = [];
  client:any=[];
  client_seguro:any=[];
  clientes:any=[];
  provincias: string[] = [
    'Azuay',
    'Bolívar',
    'Cañar',
    'Carchi',
    'Chimborazo',
    'Cotopaxi',
    'El Oro',
    'Esmeraldas',
    'Galápagos',
    'Guayas',
    'Imbabura',
    'Loja',
    'Los Ríos',
    'Manabí',
    'Morona Santiago',
    'Napo',
    'Orellana',
    'Pastaza',
    'Pichincha',
    'Santa Elena',
    'Santo Domingo de los Tsáchilas',
    'Sucumbíos',
    'Tungurahua',
    'Zamora Chinchipe',
  ];
  ciudadesPorProvincia: { [provincia: string]: string[] } = {
    Azuay: ['Cuenca', 'Giron', 'Santa Isabel'],
    Bolívar: ['Guaranda', 'Chillanes', 'San Miguel'],
    Cañar: ['Azogues', 'Biblián', 'La Troncal'],
    Carchi: ['Tulcán', 'Mira', 'Espejo'],
    Chimborazo: ['Riobamba', 'Ambato', 'Guano'],
    Cotopaxi: ['Latacunga', 'Saquisilí', 'Salcedo'],
    'El Oro': ['Machala', 'Santa Rosa', 'Pasaje'],
    Esmeraldas: ['Esmeraldas', 'Atacames', 'Muisne'],
    Galápagos: ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Santa Cruz'],
    Guayas: ['Guayaquil', 'Samborondón', 'Daule'],
    Imbabura: ['Ibarra', 'Otavalo', 'Cotacachi'],
    Loja: ['Loja', 'Cariamanga', 'Catamayo'],
    'Los Ríos': ['Babahoyo', 'Quevedo', 'Ventanas'],
    Manabí: ['Portoviejo', 'Manta', 'Chone'],
    'Morona Santiago': ['Macas', 'Gualaquiza', 'Taisha'],
    Napo: ['Tena', 'Napo', 'Archidona'],
    Orellana: ['Coca', 'Shushufindi', 'La Joya de los Sachas'],
    Pastaza: ['Puyo', 'Mera', 'Santa Clara'],
    Pichincha: ['Quito', 'Cayambe', 'Sangolquí'],
    'Santa Elena': ['Santa Elena', 'Salinas', 'La Libertad'],
    'Santo Domingo de los Tsáchilas': ['Santo Domingo', 'La Concordia', 'Valle Hermoso'],
    Sucumbíos: ['Nueva Loja', 'Shushufindi', 'Lago Agrio'],
    Tungurahua: ['Ambato', 'Baños', 'Pelileo'],
    'Zamora Chinchipe': ['Zamora', 'Yantzaza', 'Centinela del Cóndor'],
  };
  ciudadesProvincia: string[] = [];

  constructor(private cliente_service:ClienteService, private activatedRoute:ActivatedRoute, private cliente_vehiculo_service:ClienteVehiculoService,
    private cliente_vida_service:ClienteVidaService, private router:Router,private httpclien:HttpClient, private aseguradora_service:AseguradoraVehiculoService ){
  }

  ngOnInit():void{
    const params= this.activatedRoute.snapshot.params["id"];
    this.clienteVida.id_plan_vida=Number(params);
    this.clienteVehiculo.id_seguro_vehiculo=Number(params);
    this.cliente_service.getClientes().subscribe(res=>{this.clientes=res;});
  }

  submitForm(forma:NgForm) {
    if((this.cliente_vehiculo_service.estado || this.cliente_vida_service.estado) && forma.valid && this.calcularEdad()>=18 ){
      
      let id_cliente= this.clienteRepetido();
      if(id_cliente!=-1 && this.cliente_vehiculo_service.estado ){
        this.clienteVehiculo.id_cliente = id_cliente;
        this.cliente_service.updateCliente(id_cliente, this.cliente).subscribe(
          res=>{ this.correoClienteVehiculo();},
          err=>{console.log(err);}
        );
      }else if(id_cliente!=-1 && this.cliente_vida_service.estado ){
        this.clienteVida.id_cliente=id_cliente;
        this.cliente_service.updateCliente(id_cliente, this.cliente).subscribe(
          res=>{  this.correoClienteVida();},
          err=>{console.log(err);}
        );
      }
      else{
        this.cliente_service.insertCliente(this.cliente).subscribe(
          (res:Cliente) => {
            this.client=res;
            this.client=this.client[0];
            if (this.cliente_vehiculo_service.estado) {
              this.clienteVehiculo.id_cliente = this.client.id_cliente;
              this.correoClienteVehiculo();
            }
            
            else if(this.cliente_vida_service.estado){
              this.clienteVida.id_cliente=this.client.id_cliente;
              this.correoClienteVida();
            }
          },
          (err) => {
            console.log(err);
            Swal.fire({
              title:'Error',
              text: 'Ocurrio un error en el registro',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        );
      }
    
    }else{
      if(this.cliente_vehiculo_service.estado==false && this.cliente_vida_service.estado==false){
        Swal.fire({
          title:'Seleccione seguro',
          text: 'Debe de seleccionar un seguro',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        this.router.navigate(['/home']);
      }else if(forma.invalid){
        Swal.fire({
          title:'Datos incorrectos',
          text: 'Ingrese los datos correctamente',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }else if(this.calcularEdad()<18){
        Swal.fire({
          title:'Datos incorrectos',
          text: 'Debe de ser mayor de edad',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  async getAseguradora(id: string){
    this.aseguradora_service.getAseguradora(id).subscribe(res=>{
    this.aseguradora_aux = res;
    this.aseguradora = this.aseguradora_aux[0];
   })  
  }

  onProvinciaChange() {
    const provinciaSeleccionada = this.cliente.provincia;
    this.ciudades = this.ciudadesPorProvincia[provinciaSeleccionada] || [];
  }

  clienteRepetido(){
  let result=-1;
  for (let cliente of this.clientes){
    if(cliente.cedula== this.cliente.cedula){
      result=cliente.id_cliente;
      break;
    }
  }
  return result;
  }
  //Métodos para enviar correo
  correoClienteVehiculo(){
    this.cliente_vehiculo_service.insertCliente_Vehiculo(this.clienteVehiculo).subscribe(res=>
      {
      this.client_seguro=res;
      this.client_seguro=this.client_seguro[0];
      this.cliente_vehiculo_service.getCliente_Vehiculo(this.client_seguro.id_cliente_vehiculo).subscribe(res=>{
      this.client_seguro=res;
      this.client_seguro=this.client_seguro[0];
      this.aseguradora_service.getAseguradora(this.client_seguro.id_aseguradora_vehiculo).subscribe(res=>{
        this.aseguradora_aux = res;
        this.aseguradora = this.aseguradora_aux[0];
        console.log(this.aseguradora.descripcion);
        let params = {
          marca: this.client_seguro.marca,
          modelo: this.client_seguro.modelo,
          precio: this.client_seguro.precio,
          telefono_cliente: this.client_seguro.telefono,
          cedula : this.client_seguro.cedula,
          correo_aseguradora: this.client_seguro.aseguradora_correo,
          telefono_aseguradora: this.client_seguro.aseguradora_telefono,
          nombre_aseguradora: this.client_seguro.aseguradora_nombre,
          nombre: this.client_seguro.cliente_nombre,
          apellido: this.client_seguro.apellido,
          email: this.client_seguro.correo,
          descripcion: this.aseguradora.descripcion,
          ciudad: this.client_seguro.ciudad,
          provincia: this.client_seguro.provincia,
          anio: this.client_seguro.anio,
          asunto: 'Seguro Aceptado',
          mensaje: 'Hola, su seguro ha sido aceptado',
        }
        Swal.fire({
          title:'Registrado',
          text: 'Seguro registrado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.httpclien.post('http://localhost:3000/api/envio',params).subscribe(resp=>{
        console.log(resp);
       });
       this.httpclien.post('http://localhost:3000/api/envio/envioaseguradora',params).subscribe(resp=>{
        console.log(resp);
       }) 
  })
        console.log(this.client_seguro);
        this.cliente_vehiculo_service.estado=false;
        this.router.navigate(['/home']);
      }
       ,err=>{console.log(err);} )
     
    });
  }

  correoClienteVida(){
    this.cliente_vida_service.insertCliente_Vida(this.clienteVida).subscribe(res=>{
      this.client_seguro=res;
      this.client_seguro=this.client_seguro[0];
      this.cliente_vida_service.getCliente_Vida(this.client_seguro.id_cliente_vida).subscribe(res=>{
        this.client_seguro=res;
        this.client_seguro=this.client_seguro[0];
        let params = {
          nombre: this.client_seguro.cliente_nombre,
          apellido: this.client_seguro.apellido,
          nombre_plan: this.client_seguro.nombre_plan,
          descripcion_plan: this.client_seguro.plan_vida_descripcion,
          aseguradora_telefono: this.client_seguro.aseguradora_telefono,
          aseguradora_correo: this.client_seguro.aseguradora_correo,
          precio_plan: this.client_seguro.precio_plan,
          nombre_aseguradora: this.client_seguro.aseguradora_nombre,
          cedula : this.client_seguro.cedula,
          email: this.client_seguro.correo,
          telefono_cliente: this.client_seguro.telefono,
          ciudad: this.client_seguro.ciudad,
          provincia: this.client_seguro.provincia,
          asunto: 'Seguro Aceptado',
          mensaje: 'Hola, su seguro ha sido aceptado',
        }
        Swal.fire({
          title:'Registrado',
          text: 'Seguro registrado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.httpclien.post('http://localhost:3000/api/envio/vida',params).subscribe(resp=>{
        console.log(resp);
       });
       this.httpclien.post('http://localhost:3000/api/envio/envioaseguradoravida',params).subscribe(resp=>{
        console.log(resp);
       }) 
        console.log(this.client_seguro);
        this.cliente_vida_service.estado=false;
        this.router.navigate(['/home']);
      }
      , err=>{console.log(err);}
      )
     
    });
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

}

import { Component, OnInit } from '@angular/core';
import { Cliente,ClienteService } from 'src/app/services/cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ClienteVehiculoService,Cliente_Vehiculo } from 'src/app/services/cliente-vehiculo.service';
import { ClienteVidaService, Cliente_Vida } from 'src/app/services/cliente-vida.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AseguradoraVehiculoService, Aseguradora_vehiculos } from 'src/app/services/aseguradora-vehiculo.service';
import Swal from 'sweetalert2';
import { Valoracion, ValoracionService } from 'src/app/services/valoracion.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id_cliente:number=0;
  //objetos
  valoracion:Valoracion={
    id_valoracion:0,
    id_cliente:0,
    valoracion:0
  }



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
    
    Azuay: ['Camilo Ponce Enríquez', 'Chordeleg', 'Cuenca', 'El Pan', 'Girón', 'Gualaceo', 'Guachapala', 'Nabón', 'Oña', 'Paute', 'Pucara', 'San Fernando', 'Santa Isabel', 'Sevilla de Oro', 'SigSig'],
    Bolívar: ['Baba', 'Babahoyo', 'Buena Fé', 'Caluma', 'Chillanes', 'Chimbo', 'Echeandía', 'Guaranda', 'Las Naves', 'Montalvo', 'San Miguel', 'San Pedro de Huaca', 'Urdaneta', 'Vinces'],
    Cañar: ['Azogues', 'Biblián', 'Cañar', 'Déleg', 'El Tambo', 'La Troncal', 'Suscal'],
    Carchi: ['Bolívar', 'Espejo', 'Mira', 'Montúfar', 'San Pedro de Huaca', 'Tulcán'],
    Chimborazo: ['Alausí', 'Chambo', 'Chunchi', 'Colta', 'Cumandá', 'Guamote', 'Guano', 'Pallatanga', 'Penipe', 'Riobamba'],
    Cotopaxi: ['La Maná', 'Latacunga', 'Pangua', 'Pujilí', 'Salcedo', 'Saquisilí', 'Sigchos'],
    'El Oro': ['Arenillas', 'Atahualpa', 'Balsas', 'Chilla', 'El Guabo', 'Huaquillas', 'Las Lajas', 'Machala', 'Marcabelí', 'Pasaje', 'Piñas', 'Portovelo', 'Santa Rosa', 'Zaruma'],
    Esmeraldas: ['Atacames', 'Eloy Alfaro', 'Esmeraldas', 'La Concordia', 'Muisne', 'Quinindé', 'Rioverde', 'San Lorenzo'],
    Galápagos: ['Isabela', 'Puerto Ayora', 'San Cristóbal', 'Santa Cruz'],
    Guayas: ['Alfredo Baquerizo Moreno (Juján)', 'Balao', 'Balzar', 'Colimes', 'Daule', 'Durán', 'El Empalme', 'El Triunfo', 'Guayaquil', 'Isidro Ayora', 'Lomas de Sargentillo', 'Milagro', 'Naranjal', 'Naranjito', 'Nobol', 'Palestina', 'Pedro Carbo', 'Playas', 'Salitre (Urbina Jado)', 'Samborondón', 'San Jacinto de Yaguachi', 'Santa Lucía', 'Simón Bolívar'],
    Imbabura: ['Antonio Ante', 'Cotacachi', 'Ibarra', 'Otavalo', 'Pimampiro', 'San Miguel de Urcuquí'],
    Loja: ['Calvas', 'Cariamanga', 'Catamayo', 'Celica', 'Chaguarpamba', 'Espíndola', 'Gonzanamá', 'Loja', 'Macará', 'Olmedo', 'Paltas', 'Pindal', 'Puyango', 'Quilanga', 'Saraguro', 'Sozoranga', 'Zapotillo'],
    'Los Ríos': ['Baba', 'Babahoyo', 'Buena Fé', 'Mocache', 'Montalvo', 'Palenque', 'Puebloviejo', 'Quevedo', 'Quinsaloma', 'Urdaneta', 'Valencia', 'Ventanas', 'Vínces'],
    Manabí: ['24 de Mayo', 'Bolívar', 'Chone', 'El Carmen', 'Flavio Alfaro', 'Jipijapa', 'Jujan (Alfredo Baquerizo Moreno)', 'Junín', 'Manta', 'Montecristi', 'Olmedo', 'Paján', 'Pichincha', 'Portoviejo', 'Rocafuerte', 'Santa Ana', 'Sucre', 'Tosagua'],
    'Morona Santiago': ['Gualaquiza', 'Huamboya', 'Limón Indanza', 'Logroño', 'Morona', 'Palora', 'Pablo Sexto', 'San Juan Bosco', 'Santiago', 'Sucúa', 'Taisha', 'Tiwinza'],
    Napo: ['Archidona', 'Carlos Julio Arosemena Tola', 'El Chaco', 'Quijos', 'Tena'],
    Orellana: ['Aguarico', 'La Joya de los Sachas', 'Loreto', 'Orellana'],
    Pastaza: ['Arajuno', 'Mera', 'Pastaza', 'Santa Clara'],
    Pichincha: ['Cayambe', 'Mejía', 'Pedro Moncayo', 'Pedro Vicente Maldonado', 'Puerto Quito', 'Quito', 'Rumiñahui', 'San Miguel de los Bancos'],
    'Santa Elena': ['La Libertad', 'Salinas', 'Santa Elena'],
    'Santo Domingo de los Tsáchilas': ['La Concordia', 'Santo Domingo', 'Valle Hermoso'],
    Sucumbíos: ['Cascales', 'Cuyabeno', 'Gonzalo Pizarro', 'Lago Agrio', 'Putumayo', 'Sucumbíos'],
    Tungurahua: ['Ambato', 'Baños de Agua Santa', 'Cevallos', 'Mocha', 'Patate', 'Quero', 'San Pedro de Pelileo', 'Santiago de Píllaro', 'Tisaleo'],
    'Zamora-Chinchipe': ['Centinela del Cóndor', 'Chinchipe', 'El Pangui', 'Nangaritza', 'Palanda', 'Paquisha', 'Yacuambi', 'Yantzaza', 'Zamora'],

    

  };
  ciudadesProvincia: string[] = [];

  constructor(private cliente_service:ClienteService, private activatedRoute:ActivatedRoute, private cliente_vehiculo_service:ClienteVehiculoService,
    private cliente_vida_service:ClienteVidaService, private router:Router,private httpclien:HttpClient, private aseguradora_service:AseguradoraVehiculoService,
    private valoracion_service:ValoracionService ){
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
      this.id_cliente= id_cliente;
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
            this.id_cliente=this.client.id_cliente;
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
        this.httpclien.post('https://backend-tutorial-rxz2.onrender.com/api/envio',params).subscribe(resp=>{
        console.log(resp);
       });
       this.httpclien.post('https://backend-tutorial-rxz2.onrender.com/api/envio/envioaseguradora/',params).subscribe(resp=>{
        console.log(resp);
       }) 
  })
        console.log(this.client_seguro);
        this.cliente_vehiculo_service.estado=false;
        this.abrirModal();
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
        });
        this.httpclien.post('https://backend-tutorial-rxz2.onrender.com/api/envio/vida/',params).subscribe(resp=>{
        console.log(resp);
       });
       this.httpclien.post('https://backend-tutorial-rxz2.onrender.com/api/envio/envioaseguradoravida/',params).subscribe(resp=>{
        console.log(resp);
       })
        this.cliente_vida_service.estado=false;
        this.abrirModal();      
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

  setRating(rating:number){
    
    this.valoracion.valoracion= rating;
    console.log(this.valoracion.valoracion);
  }

  guardarValoracion(){
    this.valoracion.id_cliente=this.id_cliente;
    this.valoracion.valoracion*=2;
    this.valoracion_service.insertValoracion(this.valoracion).subscribe(res=>
      {console.log(res);
        Swal.fire({
          title:'Gracias por su calificación!',
          text: '  Tu calificación nos ayudará a mejorar nuestros servicios',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/home']);}

      );
  }
  abrirModal() {
    let ob= document.getElementById('modal');
    if(ob){
      ob.style.display="block";
    }
  }
  
  cerrarModal() {
    let ob= document.getElementById('modal');
    if(ob){
      ob.style.display="none";
    }
    this.router.navigate(['/home']);
}
}

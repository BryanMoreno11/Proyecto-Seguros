import { Component, OnInit } from '@angular/core';
import { ClienteVehiculoService, Vista_Cliente_Vehiculo } from 'src/app/services/cliente-vehiculo.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import 'moment/locale/es';
import { ClienteVidaService } from 'src/app/services/cliente-vida.service';
import { Valoracion, ValoracionService } from 'src/app/services/valoracion.service';
Chart.register(...registerables);
Chart.register(ChartDataLabels);



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //variables
  valoraciones:any=[];
  clientes_vehiculo:any=[];
  clientes_vida:any=[];
  clientesPorProvinciaVehiculo: { [provincia: string]: number } = {};
  clientesPorProvinciaVida: { [provincia: string]: number } = {};
  clientesPorCiudadVehiculo: { [ciudad: string]: number } = {};
  clientesPorCiudadVida: { [ciudad: string]: number } = {};
  aseguradoraVehiculo:{ [aseguradora: string]: number } = {};
  aseguradoraVida:{ [aseguradora: string]: number } = {};
  valoracionesUsuario:{ [valoracion: string]: number } = {};

   clientesPorDiaVehiculo: { [key: string]: number } = {
    lunes: 0,
    martes: 0,
    miércoles: 0,
    jueves: 0,
    viernes: 0,
    sábado: 0,
    domingo: 0,
  };

  clientesPorDiaVida: { [key: string]: number } = {
    lunes: 0,
    martes: 0,
    miércoles: 0,
    jueves: 0,
    viernes: 0,
    sábado: 0,
    domingo: 0,
  };

  constructor(private cliente_vehiculo_service:ClienteVehiculoService, private cliente_vida_service:ClienteVidaService,
    private valoracion_service:ValoracionService){
  }

  ngOnInit(): void {
    this.valoracion_service.getValoraciones().subscribe(
      res=>{
        this.valoraciones=res;
        this.obtenerValoraciones(this.valoraciones,this.valoracionesUsuario); 
        this.graficarValoracion();
      }
    );
    //Cliente Vehiculo
    this.cliente_vehiculo_service.getClientes_Vehiculo().subscribe(
      res=>{this.clientes_vehiculo=res;
        this.clientesProvincia(this.clientes_vehiculo, this.clientesPorProvinciaVehiculo);
        this.histogramaClienteProvincia(this.clientesPorProvinciaVehiculo,'seguroVehiculoProvincia','Automóvil');
        this.clientesCiudad(this.clientes_vehiculo,this.clientesPorCiudadVehiculo);
        this.histogramaClienteCiudad(this.clientesPorCiudadVehiculo,'seguroVehiculoCiudad','Automóvil');
        this.contarAseguradoras(this.clientes_vehiculo, this.aseguradoraVehiculo);
        this.histogramaAseguradoraPorcentaje(this.aseguradoraVehiculo,'seguroVehiculoPorcentaje', 'Seguros de Automóvil' );
        this.procesarClientesUltimaSemana(this.clientes_vehiculo, this.clientesPorDiaVehiculo);
        this.graficoLineaClientesSemana(this.clientesPorDiaVehiculo,"clientesSemanaVehiculo","Automóvil");
        console.log(this.valoracionesUsuario);
      }
      );
    //Cliente vida
    this.cliente_vida_service.getClientes_Vida().subscribe(
      res=>{this.clientes_vida=res;
        this.clientesProvincia(this.clientes_vida, this.clientesPorProvinciaVida);
        this.histogramaClienteProvincia(this.clientesPorProvinciaVida,'seguroVidaProvincia','Vida');
        this.clientesCiudad(this.clientes_vida, this.clientesPorCiudadVida);
        this.histogramaClienteCiudad(this.clientesPorCiudadVida,'seguroVidaCiudad','Vida');
        this.contarAseguradoras(this.clientes_vida, this.aseguradoraVida);
        this.histogramaAseguradoraPorcentaje(this.aseguradoraVida,'seguroVidaPorcentaje', 'Seguros de vida' );
        this.procesarClientesUltimaSemana(this.clientes_vida,this.clientesPorDiaVida);
        this.graficoLineaClientesSemana(this.clientesPorDiaVida,"clientesSemanaVida","Vida");    
      }
     );
  }
  //Obtener datos para los gráficos estádisticos
  clientesProvincia(clientes:any, clientesPorProvincia:{ [provincia: string]: number }){
    clientes.forEach((cliente:Vista_Cliente_Vehiculo) => {
      if (clientesPorProvincia[cliente.provincia]) {
        clientesPorProvincia[cliente.provincia]++;
      } else {
        clientesPorProvincia[cliente.provincia] = 1;
      }
    });
  }

  obtenerValoraciones(valoraciones:any,valoracionesUsuario:{ [valoracion: string]: number }){
    valoraciones.forEach((valoracion:Valoracion) => {
      if (valoracionesUsuario[valoracion.valoracion]) {
        valoracionesUsuario[valoracion.valoracion]++;
      } else {
        valoracionesUsuario[valoracion.valoracion] = 1;
      }
    });
  }

  clientesCiudad(clientes:any, clientesPorCiudad: { [ciudad: string]: number }){
    clientes.forEach((cliente:Vista_Cliente_Vehiculo)=>{
      if(clientesPorCiudad[cliente.ciudad]){
            
          clientesPorCiudad[cliente.ciudad]++;
      }else{
        clientesPorCiudad[cliente.ciudad]=1;
      }
    })
  }

  procesarClientesUltimaSemana(clientes:any,clientesPorDia: { [key: string]: number }) {
    const fechaActual = moment(); // Obtén la fecha actual
    const fechaInicioSemana = fechaActual.clone().subtract(6, 'days'); // Resta 6 días para obtener el inicio de la semana
  
    const clientesUltimaSemana = clientes.filter((cliente:Vista_Cliente_Vehiculo) => {
      const fechaRegistro = moment(cliente.fecha); // Convierte la fecha de registro a un objeto moment
      return fechaRegistro.isBetween(fechaInicioSemana, fechaActual, null, '[]'); // Verifica si la fecha está en la última semana
    });
    
    clientesUltimaSemana.forEach((cliente:Vista_Cliente_Vehiculo) => {
      const diaRegistro = moment(cliente.fecha).format('dddd').toLowerCase();// Obtiene el día de la semana
      clientesPorDia[diaRegistro]++; // Incrementa el contador del día correspondiente
    });
  }

   reorganizarDatosSegunDiaActual(clientesPorDia: { [key: string]: number }) {
    const fechaActual = moment(); // Obtén la fecha actual
  const diaActual = fechaActual.format('dddd').toLowerCase(); // Obtén el nombre del día actual en minúsculas
  console.log("el dia actual es",diaActual);
  const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  // Encuentra el índice del día actual
  const indiceDiaActual = diasSemana.indexOf(diaActual);
  // Reorganiza los datos para que el día actual se muestre al final
  const diasOrdenados = [...diasSemana.slice(indiceDiaActual + 1), ...diasSemana.slice(0, indiceDiaActual + 1)];
  // Crea un nuevo objeto con los datos reorganizados
  const datosReorganizados: { [key: string]: number } = {};
  for (const dia of diasOrdenados) {
    datosReorganizados[dia] = clientesPorDia[dia];
  }
  return datosReorganizados; 
  }

   contarAseguradoras(clientes: any[], aseguradoraCliente:{ [aseguradora: string]: number } )  { 
    let total=0; 
    for (const cliente of clientes) {
      const aseguradora = cliente.aseguradora_nombre;
      if (aseguradoraCliente[aseguradora]) {
        aseguradoraCliente[aseguradora]++;
      } else {
        aseguradoraCliente[aseguradora] = 1;
      }
      total++;
    }
    for(let key of Object.keys(aseguradoraCliente)){
      aseguradoraCliente[key]= Math.round(((aseguradoraCliente[key]/total)*100)*100)/100;
    }
    console.log(total);
  }

 

  generarColoresLista(lista:any){
    console.log("la longitud de la lista es", lista);
    let colores=[];
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    for(let i=0;i<Object.keys(lista).length;i++){
      colores.push(randomRGB());
    }
    return colores;
  }

  //Gráficos estádisticos
  histogramaClienteProvincia(clientesPorProvincia:{ [provincia: string]: number },id:string, label:string){
    
    const provincias = Object.keys(clientesPorProvincia);
    const cantidades = Object.values(clientesPorProvincia);
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    const background=this.generarColoresLista(clientesPorProvincia);
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: provincias, // Etiquetas en el eje X (provincias)
        datasets: [{
          label: label,
          data:cantidades, // Datos en el eje Y (cantidad de personas)
          backgroundColor: background, // Color de las barras
          borderColor: background,
          borderWidth: 1
          
        }]
      },
      options: {
      
        maintainAspectRatio: false, // Deshabilita la relación de aspecto automática
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90,
              font: {
                family: 'Verdana',
                weight: 'bold'
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size:15,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          }
          
        },
        plugins: {
          
          legend: {
            labels: {
              font: {
                size: 20,
                family:'Verdana',
                weight: 'bold'

            }
            }
          },datalabels: {
            display: false
          }
          
        }
      }
    });
  }

  graficarValoracion(){
    const provincias = Object.keys(this.valoracionesUsuario);
    const cantidades = Object.values(this.valoracionesUsuario);
    const ctx = document.getElementById("valoraciones") as HTMLCanvasElement;
    const background=this.generarColoresLista(this.valoracionesUsuario);
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: provincias, // Etiquetas en el eje X (provincias)
        datasets: [{
          label: "Calificaciones de los usuarios",
          data: cantidades, // Datos en el eje Y (cantidad de personas)
          backgroundColor: background, // Color de las burbujas
          borderColor: background,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90,
              font: {
                family: 'Verdana',
                weight: 'bold'
              }
            },
            axis: 'y', // Añadido para personalizar la etiqueta del eje Y
            title: {
              display: true,
              text: 'Cantidad',
              font: {
                size: 15,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 15,
                family: 'Verdana',
                weight: 'bold'
              }
            },
            axis: 'x', // Añadido para personalizar la etiqueta del eje X
            title: {
              display: true,
              text: 'Calificaciones',
              font: {
                size: 15,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          },
          datalabels: {
            display: false
          }
        }
      }
    });
  }


  histogramaClienteCiudad(clientesPorCiudad:{ [ciudad: string]: number },id:string, label:string){
    const ciudades = Object.keys(clientesPorCiudad);
    const cantidades = Object.values(clientesPorCiudad);
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    const background=this.generarColoresLista(clientesPorCiudad);
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ciudades, // Etiquetas en el eje X (ciudades)
        datasets: [{
          label: label,
          data:cantidades, // Datos en el eje Y (cantidad de personas)
          backgroundColor: background, // Color de las barras
          borderColor: background,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false, // Deshabilita la relación de aspecto automática
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Verdana',
                weight: 'bold'
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size:15,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          }
        }, plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family:'Verdana',
                weight: 'bold'

            }
            }
          }, datalabels: {
            display: false
          }
        }
      }
    });
  }

  histogramaAseguradoraPorcentaje(aseguradoraCliente:{ [aseguradora: string]: number },id:string, label:string){
  const aseguradoras = Object.keys(aseguradoraCliente);
  const cantidades = Object.values(aseguradoraCliente);
  const ctx = document.getElementById(id) as HTMLCanvasElement;
  const background= this.generarColoresLista(aseguradoraCliente);
  var chart = new Chart(ctx, {
    type: 'pie', // Cambiamos el tipo de gráfico a 'pie' para un gráfico de pastel
    data: {
      labels: aseguradoras, // Etiquetas para las porciones del pastel
      datasets: [{
        data: cantidades, // Datos para las porciones del pastel
        backgroundColor:background,
        borderColor: '#000000',
        borderWidth: 3
      }]
    },
    options: {
      maintainAspectRatio: false, // Deshabilita la relación de aspecto automática
      plugins: {
        
        legend: {
          labels: {
            font: {
              size: 16,
              family: 'Verdana',
              weight: 'bold'
            }
          }
        },
        title: {
          display: true, // Muestra el título principal
          text: label, // El texto del título viene de la variable label
          font: {
            size: 20,
            family: 'Verdana',
            weight: 'bold'
          }
        },
        datalabels: {
          display: true,
        color: 'black',
        align: 'bottom',
        backgroundColor: '#ccc',
        borderRadius: 3, // Cambia el color del texto de los labels
      font: {
        size: 10,
        family: 'Verdana',
        weight: 'bold'
      },
          formatter: (value) => {
            return value + '%';
          },
        
        },
        
      }
    }
  });
  
  }






  graficoLineaClientesSemana(clientesPorDia:{ [key: string]: number },id:string, label:string ) {
    const datosOrganizados= this.reorganizarDatosSegunDiaActual(clientesPorDia);
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(datosOrganizados), // Etiquetas en el eje X (días)
        datasets: [{
          label: label,
          data: Object.values(datosOrganizados), // Datos en el eje Y (cantidad de clientes)
          borderColor: '#0148fd', 
          backgroundColor:'#0148fd',
          borderWidth: 3,
          fill: false, // Para que la línea no se rellene
        }]
      },
      options: {
        maintainAspectRatio: false, // Deshabilita la relación de aspecto automática

        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Verdana',
                weight: 'bold'
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size:15,
                family: 'Verdana',
                weight: 'bold'
              }
            }
          }
        }, plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family:'Verdana',
                weight: 'bold'
            }
            }
          }
        }
      }
    });
  }
  
  }


// admin-seguro-vehiculo.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguroVehiculoService, Vista_Seguro_Vehiculo } from 'src/app/services/seguro-vehiculo.service';

@Component({
  selector: 'app-admin-seguro-vehiculo',
  templateUrl: './admin-seguro-vehiculo.component.html',
  styleUrls: ['./admin-seguro-vehiculo.component.css']
})
export class AdminSeguroVehiculoComponent implements OnInit {
  //variables
  seguros: any = [];
  searchText:string="";
  aseguradoras:string[]=[];

  constructor(
    private router: Router,
    private seguroVehiculoService: SeguroVehiculoService
  ) {}

  ngOnInit(): void {
    this.listarSeguros();
  }

  eliminarSeguro(id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este seguro?");
  
    if (confirmacion) {
      this.seguroVehiculoService.deleteSeguro(id).subscribe(
        () => {
          window.alert("Seguro eliminado exitosamente");
          this.listarSeguros();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  

  listarSeguros() {
    this.seguroVehiculoService.getSeguros().subscribe(
      (res) => {
        this.seguros = res;
        this.obtenerAseguradoras();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  abrirEdicion(seguro: any) {
    this.router.navigate(['/edit-seguro-vehiculo'], { state: { seguro } });
  }

  obtenerAseguradoras(){
    this.aseguradoras = Array.from(new Set(this.seguros.map((seguro:Vista_Seguro_Vehiculo) => seguro.aseguradora)));
  }
}
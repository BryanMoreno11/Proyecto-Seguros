import { Component, OnInit } from '@angular/core';
import { SeguroVidaService, Seguro_Vida } from 'src/app/services/seguro-vida.service';

@Component({
  selector: 'app-planes-personas',
  templateUrl: './planes-personas.component.html',
  styleUrls: ['./planes-personas.component.css']
})
export class PlanesPersonasComponent implements OnInit {
  segurosVida: Seguro_Vida[] = [];
  aseguradorasConPlanes: any[] = []; // Esta variable contendrá las aseguradoras con sus planes

  constructor(private seguroVidaService: SeguroVidaService) {}

  ngOnInit(): void {
    this.seguroVidaService.getSeguros().subscribe((res) => {
      this.segurosVida = res as Seguro_Vida[];
      this.agruparPlanesPorAseguradora();
    });
  }

  // Función para agrupar los planes por aseguradora
  agruparPlanesPorAseguradora() {
    // Creamos un mapa para agrupar los planes por aseguradora
    const aseguradorasMap = new Map<string, any>();

    // Iteramos a través de los seguros de vida y los agrupamos por aseguradora
    this.segurosVida.forEach((seguro) => {
      if (!aseguradorasMap.has(seguro.aseguradora_nombre)) {
        aseguradorasMap.set(seguro.aseguradora_nombre, {
          aseguradora_nombre: seguro.aseguradora_nombre,
          aseguradora_imagen: seguro.aseguradora_imagen,
          planes: []
        });
      }
      aseguradorasMap.get(seguro.aseguradora_nombre).planes.push(seguro);
    });

    // Convertimos el mapa en un arreglo
    this.aseguradorasConPlanes = Array.from(aseguradorasMap.values());
  }
}



import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aseguradoraVehiculo'
})
export class AseguradoraVehiculoPipe implements PipeTransform {

  transform(aseguradoraVehiculos: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!aseguradoraVehiculos || !searchText) {
      return aseguradoraVehiculos;
    }

    for(let aseguradoraVehiculo of aseguradoraVehiculos){
      const nombre = `${aseguradoraVehiculo.nombre}`.toLowerCase();
      if(nombre.indexOf(searchText)>-1 ){
        result.push(aseguradoraVehiculo);
      }
    }
    return result;
  }

}

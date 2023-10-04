import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seguroVehiculo'
})
export class SeguroVehiculoPipe implements PipeTransform {

  transform(seguros: any[],searchText:string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!seguros || !searchText) {
      return seguros;
    }

    for(let seguro of seguros){
      const aseguradoraVehiculo = `${seguro.aseguradora} ${seguro.vehiculo}`.toLowerCase();
      if(aseguradoraVehiculo.indexOf(searchText)>-1 ){
        result.push(seguro);
      }
    }
    return result;
  }
  

}
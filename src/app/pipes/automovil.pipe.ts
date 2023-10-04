import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'automovil'
})
export class AutomovilPipe implements PipeTransform {

  transform(automoviles: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!automoviles || !searchText) {
      return automoviles;
    }

    for(let automovil of automoviles){
      const marcaModeloAnio = `${automovil.marca} ${automovil.modelo} ${automovil.anio || ''}`.toLowerCase();
      const marcaAnio = `${automovil.marca} ${automovil.anio}`.toLowerCase();

      if(marcaModeloAnio.indexOf(searchText)>-1 || marcaAnio.indexOf(searchText)>-1 ){

        result.push(automovil);
      }
    }
    return result;
  }
}
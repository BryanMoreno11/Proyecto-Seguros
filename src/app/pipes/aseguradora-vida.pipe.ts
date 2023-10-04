import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aseguradoraVida'
})
export class AseguradoraVidaPipe implements PipeTransform {

  transform(aseguradoraVidas: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!aseguradoraVidas || !searchText) {
      return aseguradoraVidas;
    }

    for(let aseguradoraVida of aseguradoraVidas){
      const nombre = `${aseguradoraVida.nombre}`.toLowerCase();
      if(nombre.indexOf(searchText)>-1 ){
        result.push(aseguradoraVida);
      }
    }
    return result;
  }

}

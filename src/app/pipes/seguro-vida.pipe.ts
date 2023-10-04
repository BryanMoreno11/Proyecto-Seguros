import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seguroVida'
})
export class SeguroVidaPipe implements PipeTransform {

  transform(seguros: any[],searchText:string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!seguros || !searchText) {
      return seguros;
    }

    for(let seguro of seguros){
      const aseguradoraVida = `${seguro.aseguradora_nombre} ${seguro.plan_vida_nombre}`.toLowerCase();
      if(aseguradoraVida.indexOf(searchText)>-1 ){
        result.push(seguro);
      }
    }
    return result;
  }

}
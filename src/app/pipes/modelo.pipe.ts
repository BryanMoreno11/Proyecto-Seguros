import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelo'
})
export class ModeloPipe implements PipeTransform {

 
  transform(modelos: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!modelos || !searchText) {
      return modelos;
    }

    for(let modelo of modelos){
      const marcaModelo = `${modelo.marca} ${modelo.nombre}`.toLowerCase();
      if(marcaModelo.indexOf(searchText)>-1 || marcaModelo.indexOf(searchText)>-1 ){
        result.push(modelo);
      }
    }
    return result;
  }

}

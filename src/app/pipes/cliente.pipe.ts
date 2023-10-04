import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cliente'
})
export class ClientePipe implements PipeTransform {

  transform(clientes: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    const result=[];
    if (!clientes || !searchText) {
      return clientes;
    }

    for(let cliente of clientes){
      const busqueda = `${cliente.cedula} ${cliente.nombre} ${cliente.apellido} ${cliente.provincia} ${cliente.ciudad}`.toLowerCase();
    
      if(busqueda.indexOf(searchText)>-1){

        result.push(cliente);
      }
    }
    return result;
  }

}

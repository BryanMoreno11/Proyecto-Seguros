import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    nombres: '',
    apellidos: '',
    edad: null,
    genero: '',
    estadoCivil: '',
    correo: '',
    numeroCelular: '',
    provincia: '',
    ciudad: ''
  };
   // Aquí puedes definir las ciudades pero ahora solo trabajaremos de manera ficticia
  
  ciudades: string[] = [];

  onProvinciaChange() {
    // Aquí deberías implementar la lógica para obtener las ciudades basadas en la provincia seleccionada por ahora estas son ficticias xq estan con mensajes
    switch (this.formData.provincia) {
      case 'provincia1':
        this.ciudades = ['Cuenca', 'Giron', 'Santa Isabel'];
        break;
      case 'provincia2':
        this.ciudades = ['Pasaje', 'Machala', 'Santa Rosa'];
        break;
      default:
        this.ciudades = [];
    }
  }

  submitForm() {
    // Aquí puedes agregar la lógica para enviar el formulario a tu servidor
    console.log(this.formData);
  }
}
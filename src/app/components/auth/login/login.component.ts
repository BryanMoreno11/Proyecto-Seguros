import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth'; // Asegúrate de importar UserCredential desde tu paquete de Firebase
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      Swal.fire({
        title:'¡Alerta!',
        text: 'Ingrese correctamente los datos',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    } else {
      const userData = { email: this.username, password: this.password };

      // Verifica si el usuario está bloqueado antes de intentar iniciar sesión
      if (this.userService.isUserBlocked(userData.email)) {
        Swal.fire({
          title:'¡Alerta!',
          text: 'Limite superado de intentos, usuario bloqueado.',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        return;
      }

      this.userService.login(userData)
        .subscribe(
          (userCredential: UserCredential) => {
            console.log(userCredential);
            Swal.fire({
              title:'¡Alerta!',
              text: 'Acceso al panel administrador concedido',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.router.navigate(['/admin/admin-dashboard']);
          },
          (error: any) => {
            Swal.fire({
              title:'¡Alerta!',
              text: 'Credenciales de acceso erroneas.',
              icon: 'warning',
              confirmButtonText: 'OK'
            })
            console.log(error);
          }
        );
    }
  }
}


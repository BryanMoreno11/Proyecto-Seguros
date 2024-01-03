import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth'; // Asegúrate de importar UserCredential desde tu paquete de Firebase

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
      window.alert('Ingrese correctamente los datos');
    } else {
      const userData = { email: this.username, password: this.password };

      // Verifica si el usuario está bloqueado antes de intentar iniciar sesión
      if (this.userService.isUserBlocked(userData.email)) {
        window.alert('Usuario bloqueado. Por favor, contacte al soporte.');
        return;
      }

      this.userService.login(userData)
        .subscribe(
          (userCredential: UserCredential) => {
            console.log(userCredential);
            this.router.navigate(['/admin/admin-dashboard']);
          },
          (error: any) => {
            window.alert('Credenciales Erróneas');
            console.log(error);
          }
        );
    }
  }
}

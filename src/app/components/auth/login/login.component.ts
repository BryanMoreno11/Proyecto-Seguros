import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
      this.userService.login(userData)
        .then((userCredential) => {
          console.log(userCredential);
          this.router.navigate(['/admin/admin-dashboard']);
        })
        .catch((error) => {
          window.alert('Credenciales Erroneas');
          console.log(error);
        });
    }
  }
}

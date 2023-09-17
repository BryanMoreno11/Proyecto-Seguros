import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

   constructor(private loginService: LoginService) {}
   onSubmit() {
    this.loginService.login(this.username, this.password);
  }
  
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 @Injectable({
  providedIn: 'root'
})
export class LoginService {

   login(username: string, password: string) {
    // Logic for login here
    console.log(username, password);
  }
}
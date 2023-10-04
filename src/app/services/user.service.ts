import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null = null; // Variable para almacenar la información del usuario

  constructor(private auth: Auth) {
    // Suscríbete al cambio de estado de autenticación para obtener el usuario actual
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    signOut(this.auth);
  }
  
  getCurrentUserEmail() {
    return this.user ? this.user.email : null; // Retorna el correo del usuario o null si no está autenticado
  }
}

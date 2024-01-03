import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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

  login({ email, password }: any): Observable<any> {
    return new Observable(observer => {
      const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos_' + email) || '0', 10);

      if (intentosFallidos >= 3) {
        observer.error('Usuario bloqueado');
        return;
      }

      signInWithEmailAndPassword(this.auth, email, password)
        .then(response => {
          // Éxito en la autenticación
          localStorage.removeItem('intentosFallidos_' + email); // Restablecer intentos fallidos
          observer.next(response);
        })
        .catch(error => {
          // Manejo de intentos fallidos
          this.handleFailedAttempt(email);
          observer.error(error);
        });
    });
  }

  logout() {
    signOut(this.auth);
  }

  getCurrentUserEmail() {
    return this.user ? this.user.email : null; // Retorna el correo del usuario o null si no está autenticado
  }

  private handleFailedAttempt(email: string): void {
    const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos_' + email) || '0', 10) + 1;
    
    localStorage.setItem('intentosFallidos_' + email, intentosFallidos.toString());

    if (intentosFallidos >= 3) {
      // Puedes realizar alguna acción adicional, como bloquear el usuario en el servidor si es necesario.
      // Aquí, simplemente mostramos un mensaje en la consola.
      console.log('Usuario bloqueado');
    }
  }

  isUserBlocked(email: string): boolean {
    const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos_' + email) || '0', 10);
    return intentosFallidos >= 3;
  }
}

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null = null;

  constructor(private auth: Auth) {
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
          localStorage.removeItem('intentosFallidos_' + email);
          observer.next(response);
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            console.log('Correo electrónico o credenciales no válidos. No se actualizó el contador de intentos fallidos.');
            observer.error('Correo electrónico o credenciales no válidos. No se actualizó el contador de intentos fallidos.');
          } else if (error.code === 'auth/user-not-found') {
            console.log('Usuario no encontrado. No se actualizó el contador de intentos fallidos.');
            observer.error('Usuario no encontrado. No se actualizó el contador de intentos fallidos.');
          } else {
            this.handleFailedAttempt(email);
            console.error('Credenciales Erróneas:', error);
            observer.error('Credenciales Erróneas');
          }
        });
    });
  }

  logout() {
    signOut(this.auth);
  }

  getCurrentUserEmail() {
    return this.user ? this.user.email : null;
  }

  private handleFailedAttempt(email: string): void {
    if (!this.isUserBlocked(email)) {
      const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos_' + email) || '0', 10) + 1;
      localStorage.setItem('intentosFallidos_' + email, intentosFallidos.toString());

      if (intentosFallidos >= 3) {
        signInWithEmailAndPassword(this.auth, email, 'fakePassword')
          .then(() => {})
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              console.log('Correo electrónico o credenciales no válidos. No se actualizó el contador de intentos fallidos.');
            } else {
              localStorage.setItem('intentosFallidos_' + email, intentosFallidos.toString());

              if (intentosFallidos >= 3) {
                console.log('Usuario bloqueado localmente');
              }
            }
          });
      }
    }
  }

  isUserBlocked(email: string): boolean {
    const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos_' + email) || '0', 10);
    return intentosFallidos >= 3;
  }

  
// ... (otras funciones)

getBlockedUsers(): string[] {
  const blockedUsers: string[] = [];

  // Iterar sobre el almacenamiento local y obtener usuarios bloqueados
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('intentosFallidos_')) {
      const email = key.substring('intentosFallidos_'.length);
      if (this.isUserBlocked(email)) {
        blockedUsers.push(email);
      }
    }
  }

  return blockedUsers;
}

unblockUser(email: string): void {
  // Desbloquear al usuario localmente
  localStorage.removeItem('intentosFallidos_' + email);
}


}


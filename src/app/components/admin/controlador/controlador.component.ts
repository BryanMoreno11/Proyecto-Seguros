import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controlador',
  templateUrl: './controlador.component.html',
  styleUrls: ['./controlador.component.css']
})
export class ControladorComponent implements OnInit {
  userEmail: string | null = null; // Variable para almacenar el correo del usuario

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Obtén el correo del usuario al iniciar el componente
    this.userEmail = this.userService.getCurrentUserEmail();
  }

  onClick() {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Al confirmar se cerrará la sesión de administrador.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Alerta!",
          text: "Se ha cerrado la sesión de administrador",
          icon: "success"
          
        });
        this.router.navigate(['/login']);
        this.userService.logout();
      }
    });
    
  }
}

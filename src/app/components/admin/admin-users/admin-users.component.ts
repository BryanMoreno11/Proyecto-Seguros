import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  blockedUsers: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.blockedUsers = this.userService.getBlockedUsers();
  }

  unblockUser(email: string): void {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Al confirmar se desbloqueará esta cuenta",
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
          text: "¡La cuenta se ha desbloqueado con éxito!",
          icon: "success"
          
        });
        this.userService.unblockUser(email);
        this.blockedUsers = this.userService.getBlockedUsers(); // Actualizar la lista después de desbloquear
      }
    });
  
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

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
    this.router.navigate(['/login']);
    this.userService.logout();
  }
}

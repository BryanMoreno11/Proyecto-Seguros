import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  closeMenu() {
    // Cierra el menú
    const checkbox = document.getElementById('check') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
}
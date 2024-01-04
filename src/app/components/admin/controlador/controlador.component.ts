import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controlador',
  templateUrl: './controlador.component.html',
  styleUrls: ['./controlador.component.css']
})
export class ControladorComponent {
  userEmail: string | null = null;
  private menuOpen = false;

  constructor(private userService: UserService, private router: Router, private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.userEmail = this.userService.getCurrentUserEmail();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateIconPositions();
  }

  onToggleChange() {
    this.menuOpen = !this.menuOpen;
    this.updateIconPositions();
  }

  openMenu() {
    this.menuOpen = true;
    this.updateCancelPosition();
  }

  closeMenu() {
    this.menuOpen = false;
    const toggleCheckbox = this.elRef.nativeElement.querySelector('#menu-toggle');
    if (toggleCheckbox) {
      toggleCheckbox.checked = false;
    }
    this.updateIconPositions();
  }

  private updateCancelPosition() {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
    if (!sidebar) {
      return;
    }

    let leftPosition = parseInt(getComputedStyle(sidebar).left, 10);
    leftPosition = Math.max(leftPosition, 0);

    const menuCancel = this.elRef.nativeElement.querySelector('#menu-cancel');
    if (menuCancel) {
      this.renderer.setStyle(menuCancel, 'left', `calc(1% + ${leftPosition}px)`);
      this.renderer.setStyle(menuCancel, 'top', `50%`);
    }
  }

  private updateIconPositions() {
    const menuBtn = this.elRef.nativeElement.querySelector('#menu-btn');
    const menuCancel = this.elRef.nativeElement.querySelector('#menu-cancel');

    if (!menuBtn || !menuCancel) {
      return;
    }

    const isOpen = this.menuOpen;

    this.renderer.setStyle(menuBtn, 'display', isOpen ? 'none' : 'block');
    this.renderer.setStyle(menuCancel, 'display', isOpen ? 'block' : 'none');

    if (this.menuOpen) {
      const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
      if (!sidebar) {
        return;
      }

      let leftPosition = parseInt(getComputedStyle(sidebar).left, 10);
      leftPosition = Math.max(leftPosition, 0);

      this.renderer.setStyle(menuBtn, 'left', `calc(1% + ${leftPosition}px)`);
      this.renderer.setStyle(menuBtn, 'top', `50%`);

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const cancelTopPosition = 50 + scrollTop;

      this.renderer.setStyle(menuCancel, 'left', `calc(1% + ${leftPosition}px)`);
      this.renderer.setStyle(menuCancel, 'top', `${cancelTopPosition}px`);
    }
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
        this.closeMenu();
        
    this.router.navigate(['/login']);
        this.userService.logout();
      }
    });
    
  }
}

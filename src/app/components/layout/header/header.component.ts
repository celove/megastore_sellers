import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, PanelMenuModule, SidebarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  sidebarVisible: boolean = false;
  sideMenuItems: MenuItem[] = [];
  loggedIn: boolean | null = false;

  constructor(private location: Location) {}
 
  back(): void {
    this.location.back()
  }


  ngOnInit() {
    //this.loggedIn = this.authService.isAuthenticated();
    this.sideMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Gestão da Loja',
        icon: 'pi pi-fw pi-shop',
        routerLink: ['/store-management']
      },
      {
        label: 'Gestão de Estoque',
        icon: 'pi pi-fw pi-warehouse',
        items: [
          {
            label: 'Cadastro de Produtos',
            icon: 'pi pi-fw pi-barcode',
            routerLink: ['/profile']
          },
          {
            label: 'Estoque',
            icon: 'pi pi-fw pi-truck',
            routerLink: ['/security']
          }
        ]
      },
      {
        label: 'Recomendados / Destaques',
        icon: 'pi pi-fw pi-cart-plus',
        routerLink: ['/contact']
      },
      {
        label: 'Vendas',
        icon: 'pi pi-fw pi-dollar',
        routerLink: ['/contact']
      }
    ];
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authService.logout();
  }
}

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
        label: 'User Management',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/dashboard-user']
      },
      {
        label: 'Product Management',
        icon: 'pi pi-fw pi-barcode',
        routerLink: ['/contact']
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: ['/profile']
          },
          {
            label: 'Security',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/security']
          }
        ]
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

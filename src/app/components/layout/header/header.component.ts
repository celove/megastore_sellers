import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, PanelMenuModule, SidebarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sidebarVisible: boolean = false;
  sideMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.sideMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'User Management',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/users']
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
}

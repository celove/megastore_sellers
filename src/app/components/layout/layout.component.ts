import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadingService } from '../../services/auth/loading.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastModule, CommonModule, ProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  authService = inject(AuthService);
  loadingService = inject(LoadingService);
  isLoading = false;

  constructor(private cdr: ChangeDetectorRef) {}


  ngAfterViewInit() {
    this.loadingService.isLoading.subscribe(il => {
      this.isLoading = il;
      this.cdr.detectChanges();
    })
  }
}

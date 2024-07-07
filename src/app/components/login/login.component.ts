import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  providers: [],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  username: string = '';
  password: string = '';
  // http = inject(HttpClient)
  onLogin(): void {
    console.log('loginn');
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
    // this.authService.login({ username: this.username, password: this.password }).subscribe(
    //   () => this.router.navigateByUrl('/home'),
    //   error => console.error(error)
    // );
  }
}

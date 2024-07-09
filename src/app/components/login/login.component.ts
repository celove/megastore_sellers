import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { error } from 'console';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CheckboxModule, PasswordModule, ButtonModule],
  providers: [],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  messageService = inject(MessageService)
  authService = inject(AuthService);
  router = inject(Router);
  username: string = '';
  password: string = '';
  // http = inject(HttpClient)
  onLogin(): void {
    console.log('loginn');
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, error => {
      if(error.status == 401) {
        this.messageService.add({ severity: 'warn', summary: 'Ops', detail: 'Usuário ou Senha incorretos!' })
      }
    });
  }
}

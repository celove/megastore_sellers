import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth'; // Your API endpoint here
  // private authUrl = 'https://api.funtranslations.com/translate/'; // Your API endpoint here
  private tokenKey = 'access_token';
  private cryptoKey = 'safeKey';
  router = inject(Router);

  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl + '/login/seller', { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login')
  }

  isAuthenticated(): boolean | null {
    const token: any = localStorage.getItem(this.tokenKey) == null ? "" : localStorage.getItem(this.tokenKey);

    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}

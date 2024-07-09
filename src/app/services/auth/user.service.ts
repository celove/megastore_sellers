import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl = 'http://localhost:8080/auth'; // Your API endpoint here
  // private authUrl = 'https://api.funtranslations.com/translate/'; // Your API endpoint here

  http = inject(HttpClient);


  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.authUrl + '/user', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  insertPasswordUser(user: User): Observable<User> {
    return this.http.put<User>(this.authUrl + '/user/password/'+user.id, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.authUrl + '/user/'+user.id, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.authUrl + '/user', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.authUrl + '/user/'+userId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  deleteUser(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(this.authUrl + '/user/'+userId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  newUser() {
    return  {
      id: '',
      name: '',
      username: '',
      cnpj: '',
      email: '',
      storeName: '',
      phone: '',
      password: '',
      address: {
        cep: '',
        street: '',
        number: '',
        complement: '',
        state: '',
        city: '',
        neighborhood: ''

      }
    };
  }

}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
  id: number;
  login: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isLoggedInSubject.next(this.isAuthenticated());
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  login(login: string, password: string): Observable<boolean> {
    console.log('Attempting to log in:', login);

    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        console.log('Fetched users from API:', users); 
        const user = users.find(u => u.login === login && u.password === password);
        if (user && this.isBrowser) {
          console.log('Login successful, saving token:', user.token);
          localStorage.setItem('authToken', user.token);
          this.isLoggedInSubject.next(true);
          return true;
        }
        console.log('Login failed: invalid credentials.');
        return false;
      }),
      catchError(error => {
        console.error('Error during login:', error); 
        return of(false); 
      })
    );
  }

  logout(): void {
    console.log('Logging out user.');
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return localStorage.getItem('authToken') !== null;
  }
}

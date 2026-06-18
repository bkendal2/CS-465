import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = '/api';
  private tokenKey = 'travlr-token';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  public getToken(): string {
    return this.storage.getItem(this.tokenKey) || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }

  public logout(): void {
    this.storage.removeItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name };
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, formData);
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, formData);
  }
}
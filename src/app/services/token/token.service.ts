// token.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 1 // days
    });
    console.log("token set: ", token)
  }

  getToken(): string {
    return this.cookieService.get(this.tokenKey);
  }

  deleteToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}

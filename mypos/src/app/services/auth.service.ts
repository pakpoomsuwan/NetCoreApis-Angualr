import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly keyAuth: string = environment.keyLocalAuthenInfo;
  constructor(private router: Router) { }

  isLogin(): boolean {
    return localStorage.getItem(this.keyAuth) != null;
  }

  login(token: string) {
    localStorage.setItem(this.keyAuth, token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}

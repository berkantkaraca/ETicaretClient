import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtHelper.decodeToken(token);
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);

    //Gelen token expire olmuş mu kontrolü
    //Eğer try'da patlarsa (token geçersiz ise) catch bloğuna düşer ve expired true olur
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;

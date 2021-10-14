import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = false;
  private currentUser: User = new User();
  private accessToken = '';

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {
    this.loadAccessToken();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public currentUserIsAdmin(): boolean {
    if (!this.loggedIn) {
      return false;
    }

    return this.currentUser.isAdmin;
  }

  private loadAccessToken(): void {
    const token = sessionStorage.getItem('accessToken');
    if (token !== null) {
      this.accessToken = token;
      this.loggedIn = true;
      this.userInit();
    }
  }

  private setAccessToken(token: string): void {
    this.accessToken = token;
    this.loggedIn = true;
    sessionStorage.setItem('accessToken', token);
  }

  private userInit(): void {
    const token = this.jwtHelper.decodeToken(this.accessToken);
    this.currentUser.username = token.id;
    this.currentUser.isAdmin = token.is_admin;
  }

  public login(username: string, password: string): Observable<void> {
    return new Observable<void>(observe => {
      this.http.post(encodeURI(`${environment.apiUrl}/login`), JSON.stringify({
        username, password
      }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe({
        next: (reply: any) => {
          this.setAccessToken(reply.token);
          this.userInit();
          observe.next();
          observe.complete();
        },
        error: _ => {
          observe.error();
          observe.complete();
        }
      });
    });
  }

  public logout(): void {
    sessionStorage.clear();
    this.accessToken = '';
    this.currentUser.username = '';
    this.currentUser.isAdmin = false;
    this.loggedIn = false;
  }

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginObject } from "../models/login-object.model";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { ConfigService } from './config.service';
import { map, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private localStorageService = null;
  private currentSession: Session = null;
  private basePath = null;
  public isAuthenticated: Boolean = false;

  constructor(private http: HttpClient) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.basePath = ConfigService.settings.api.url_base
    this.isAuthenticated = this._isAuthenticated();
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('session');
    return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  getCurrentUsername(): string {
    var session: Session = this.getCurrentSession();
    return (session && session.username) ? session.username : null;
  };

  private _isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };



  login(user: User): Observable<Session> {
    console.log("login");
    return this.http.post<Session>(this.basePath + '/api/api-token-auth', user)
      .pipe(
        map(v => {
          console.log(v);
          user.password = '';
          let s = new Session()
          s.token = v.token;
          s.username = user.username;
          this.currentSession = s;
          this.localStorageService.setItem('session', JSON.stringify(s));
          this.isAuthenticated = true;
          return s;
        }),
      );
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  logout(){
    this.currentSession = null;
    this.localStorageService.removeItem('session');
    this.isAuthenticated = false;
  }
}
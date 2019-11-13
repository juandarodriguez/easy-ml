import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginObject } from "../models/login-object.model";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { ConfigService } from './config.service';

@Injectable()
export class AuthenticationService {

  private localStorageService = null;
  private currentSession: Session = null;
  private basePath = null;

  constructor(private http: HttpClient) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.basePath = ConfigService.settings.api.url_base
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  

  login(user: User): Observable<Session> {
    console.log("login");
    return this.http.post<Session>(this.basePath + '/api/api-token-auth', user);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  setToken(token: string) {

  }
}
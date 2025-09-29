import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response';
import { User } from '@auth/interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));
  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if ( this._authStatus() === 'checking') {
      return 'checking';
    }
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed(() => this._user());

  token = computed(() => this._token());


  checkStatusResource = rxResource({
    loader: () => this.checkAuthStatus()
  });

  login(email:string, password: string):Observable<boolean> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.handleAuthSuccess(response)
      }),
      map(() => true),
      catchError((error: any) => {
        return this.handleAuthError(error);
      })
    );
  }

  checkAuthStatus():Observable<boolean> {
    const token = localStorage.getItem('token');
    if ( !token ) return of(false);
    return this.http.get<AuthResponse>(`${environment.baseUrl}/auth/check-status`).pipe(
      tap(response => {
        this.handleAuthSuccess(response)
      }),
      map(() => true),
      catchError((error: any) => {
        return this.handleAuthError(error);
      })
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({user, token}: AuthResponse) {
      this._authStatus.set('authenticated');
      this._user.set(user);
      this._token.set(token);
      localStorage.setItem('token', token);
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }



}

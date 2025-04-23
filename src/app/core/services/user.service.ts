import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://freeapi.miniprojectideas.com/api/JWT';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('loggedInUser');
    if (user) this.currentUserSubject.next(JSON.parse(user));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/Login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('token', user.token || '');
        this.currentUserSubject.next(user);
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateNewUser`, user);
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
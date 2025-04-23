import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUserSubject.next(JSON.parse(user));
    }
  }


  register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(
      (u: any) =>
        (u.email || '').trim().toLowerCase() ===
        (user.email || '').trim().toLowerCase()
    );
    if (exists) throw new Error('User already exists');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const adminEmail = 'admin@horizon.com';
    const adminPassword = 'Horizon'

    if (email === adminEmail && password === adminPassword) {
      const adminUser = { email: adminEmail, role: 'Admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      this.loggedInUserSubject.next(adminUser);
      return adminUser;
    }

    const user = users.find((u: any) => u.email === email && u.password === password);
    console.log('Logged in as:', user);
    if (!user) throw new Error('Invalid Email or Password');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user); 
    return user;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './accounts.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private accountService: AccountService) {
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

    user.id = crypto.randomUUID();
    user.active = true; 

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    this.accountService.createDefaultAccountsForUser(user.id, user.firstName);
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser() {
    return this.loggedInUserSubject.value;
  }

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const adminEmail = 'admin@horizon.com';
    const adminPassword = 'Horizon';

    if (email === adminEmail && password === adminPassword) {
      const adminUser = { email: adminEmail, role: 'Admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      this.loggedInUserSubject.next(adminUser);
      return adminUser;
    }

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );
    console.log('Logged in as:', user);
    if (!user) throw new Error('Invalid Email or Password');

    if (!user.active) {
      throw new Error('Account deactivated. Please visit nearest branch.');
    }

    if (this.accountService.hasFrozenAccount(user.id)) {
      throw new Error('Account frozen due to suspicious activity!');
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }

  getToken(): string | null {
    const user = localStorage.getItem('loggedInUser');
    return user ? 'token' : null;
  }

  refreshUser(user: any) {
    this.loggedInUserSubject.next(user);
  }

  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

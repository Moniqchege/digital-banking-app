import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [];

  constructor() {
    const stored = localStorage.getItem('accounts');
    if (stored) {
      this.accounts = JSON.parse(stored);
    }
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  addAccount(newAccount: Account): void {
    const exists = this.accounts.some(account => account.id === newAccount.id);
    if (!exists) {
      this.accounts.push(newAccount);
      this.saveToLocalStorage();
    } else {
      console.warn('Duplicate account detected!');
    }
  }

  updateAccount(updatedAccount: Account): void {
    const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
    if (index !== -1) {
      this.accounts[index] = updatedAccount;
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }
}

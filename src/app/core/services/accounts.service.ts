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

  createDefaultAccountsForUser(userId: string, name: string) {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  
    const defaultAccounts = [
      {
        id: crypto.randomUUID(),
        userId,
        name: `${name}'s Debit Account`,
        balance: 10000,
        mask: '**** 1234',
        type: 'Debit',
        frozen: false
      },
      {
        id: crypto.randomUUID(),
        userId,
        name: `${name}'s Savings Account`,
        balance: 10000,
        mask: '**** 5678',
        type: 'Savings',
        frozen: false
      }
    ];
  
    const updatedAccounts = [...accounts, ...defaultAccounts];
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  }
  
  
  private generateAccountMask(): string {
    return '****' + Math.floor(1000 + Math.random() * 9000).toString(); // e.g., ****1234
  }
  
  
  private generateAccountNumber(): string {
    return 'ACCT-' + Math.floor(100000 + Math.random() * 900000); // random 6-digit number
  }
  
}

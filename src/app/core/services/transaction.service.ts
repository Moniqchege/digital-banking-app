import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { UserService } from './user.service'; // Make sure UserService is imported

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  constructor(private userService: UserService) {
    // Listen for logged-in user changes
    this.userService.loggedInUser$.subscribe(user => {
      if (user) {
        this.loadTransactions(user.id);
      }
    });
  }

  loadTransactions(userId: string) {
    const stored = localStorage.getItem(`transactions_${userId}`);
    if (stored) {
      this.transactions = JSON.parse(stored);
      this.transactionsSubject.next(this.transactions);
    }
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  updateTransaction(transaction: Transaction): void {
    const index = this.transactions.findIndex(txn => txn.name === transaction.name);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...transaction };
      this.saveToLocalStorage();
      this.transactionsSubject.next(this.transactions);
    }
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.saveToLocalStorage();
    this.transactionsSubject.next(this.transactions);
  }

  private saveToLocalStorage(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(this.transactions));
    }
  }
}

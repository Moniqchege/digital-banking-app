import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model'; // ✅ Correct import

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private transactions: Transaction[] = [];

  constructor() { 
    const stored = localStorage.getItem('transactions');
    if (stored) {
      this.transactions = JSON.parse(stored);
    }
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  updateTransaction(transaction: Transaction): void {
    const index = this.transactions.findIndex(txn => txn.name === transaction.name);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...transaction };
      this.saveToLocalStorage();
    }
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage():void{
    localStorage.setItem('transactions', JSON.stringify(this.transactions))
  }
}

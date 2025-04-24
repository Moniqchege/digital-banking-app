import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService
  ){}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }
  

  formatAmount(amount: number): string {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
    return amount > 0 ? `+${formatted}` : formatted;
  }

  updateTransactionStatus(transaction: Transaction, status: 'Completed' | 'Pending'): void {
    transaction.status = status;
    this.transactionService.updateTransaction(transaction);
  }
}
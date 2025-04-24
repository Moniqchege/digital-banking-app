import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../core/models/transaction.model';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  query: string = '';
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(txns => {
      this.transactions = txns;
    });
  }

  filteredTransactions() {
    if (!this.query) return this.transactions;

    return this.transactions.filter(txn =>
      txn.name.toLowerCase().includes(this.query.toLowerCase()) ||
      txn.type.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  }
}

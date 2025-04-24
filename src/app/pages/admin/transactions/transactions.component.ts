import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Transaction {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  query: string = '';

  // Mock data for transactions
  transactions: Transaction[] = [
    { id: 'TXN001', name: 'Deposit', type: 'Credit', amount: 5000, date: '2025-04-01' },
    { id: 'TXN002', name: 'Withdrawal', type: 'Debit', amount: 10000, date: '2025-04-02' },
    { id: 'TXN003', name: 'Transfer', type: 'Debit', amount: 1500, date: '2025-04-03' },
    { id: 'TXN004', name: 'Deposit', type: 'Credit', amount: 3000, date: '2025-04-04' }
  ];

  // Filtered transactions based on the search query
  filteredTransactions() {
    if (!this.query) {
      return this.transactions; // Return all transactions if no query
    }
    return this.transactions.filter(txn => {
      return txn.name.toLowerCase().includes(this.query.toLowerCase()) ||
             txn.type.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  // Format the amount into a readable string (currency format)
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
}

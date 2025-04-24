import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Transaction {
  id: string;
  name: string;
  user: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-pending-transactions',
  imports: [CommonModule],
  templateUrl: './pending-transactions.component.html',
  styleUrl: './pending-transactions.component.css'
})
export class PendingTransactionsComponent {
  pendingTxns: Transaction[] = [
    {
      id: 'TXN001',
      name: 'Deposit',
      user: 'John Doe',
      amount: 5000,
      status: 'pending'
    },
    {
      id: 'TXN002',
      name: 'Withdrawal',
      user: 'Jane Smith',
      amount: 10000,
      status: 'pending'
    }
  ];

  // Approve transaction method
  approve(txn: Transaction): void {
    txn.status = 'approved'; // Set the status to 'approved'
    this.removeFromPending(txn); // Remove from pending list
    console.log(`Transaction ${txn.id} has been approved.`);
  }

  reject(txn: Transaction): void {
    txn.status = 'rejected'; // Set the status to 'rejected'
    this.removeFromPending(txn); // Remove from pending list
    console.log(`Transaction ${txn.id} has been rejected.`);
  }

  removeFromPending(txn: Transaction): void {
    this.pendingTxns = this.pendingTxns.filter(t => t.id !== txn.id);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
}

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
  selector: 'app-audit-logs',
  imports: [CommonModule],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.css'
})
export class AuditLogsComponent {
  pendingTxns: Transaction[] = [
    {
      id: 'TXN001',
      name: 'Withdrawal',
      user: 'John Doe',
      amount: 1500,
      status: 'pending'
    },
    {
      id: 'TXN002',
      name: 'Deposit',
      user: 'Jane Smith',
      amount: 3000,
      status: 'pending'
    }
  ];

  approve(txn: Transaction): void {
    txn.status = 'approved';
    this.removeFromPending(txn);
    console.log(`Transaction ${txn.id} approved.`);
  }

  reject(txn: Transaction): void {
    txn.status = 'rejected';
    this.removeFromPending(txn);
    console.log(`Transaction ${txn.id} rejected.`);
  }

  removeFromPending(txn: Transaction): void {
    this.pendingTxns = this.pendingTxns.filter(t => t.id !== txn.id);
  }

  formatAmount(amount: number): string {
    return 'KES ' + amount.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

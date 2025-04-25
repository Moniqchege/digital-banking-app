import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../../core/models/transfer.model';
import { TransferService } from '../../../core/services/transfer.service';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';

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
  styleUrl: './audit-logs.component.css',
})
export class AuditLogsComponent implements OnInit {
  pendingTxns: Transfer[] = [];

  constructor(
    private transferService: TransferService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.pendingTxns = this.transferService.getPendingTransfers();
  }

  getUserFullName(userId: string): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u:any) => u.id === userId);
    if (user) {
      return user.firstName + ' ' + user.lastName;
    }
    return 'Unknown User';
  }

  approve(txn: Transfer): void {
    
    this.transferService.updateTransferStatus(txn.id, 'Approved');
    
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const sender = users.find((u: any) => u.id === txn.fromAccount.id);
    const receiver = users.find((u: any) => u.id === txn.toAccount.id);
    
    if (sender && receiver) {
      
      sender.balance -= txn.amount;

      
      receiver.balance += txn.amount;

      
      localStorage.setItem('users', JSON.stringify(users));
      
      this.notificationService.addNotification(
        'Transfer Approved',
      'The transfer has been approved successfully.',
      'success'
      );
    }

    
    this.removeFromPending(txn);
  }


  reject(txn: Transfer): void {
    // Only update the status to 'Rejected'
    this.transferService.updateTransferStatus(txn.id, 'Rejected');
    
    // No balance change, just remove from pending
    this.removeFromPending(txn);
    
    this.notificationService.addNotification(
      'Transfer Rejected',
    'The transfer has been rejected.',
    'error'
    );
  }

  removeFromPending(txn: Transfer): void {
    this.pendingTxns = this.pendingTxns.filter((t) => t.id !== txn.id);
  }

  formatAmount(amount: number): string {
    return (
      '$' +
      amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
}
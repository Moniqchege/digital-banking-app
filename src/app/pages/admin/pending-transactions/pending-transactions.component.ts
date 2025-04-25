import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../core/services/transfer.service';
import { Transfer } from '../../../core/models/transfer.model';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-transactions',
  imports: [CommonModule],
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.css'],
})
export class PendingTransactionsComponent implements OnInit {
  private pendingTransfersSubject = new BehaviorSubject<Transfer[]>([]);
  pendingTxns$ = this.pendingTransfersSubject.asObservable();

  constructor(private transferService: TransferService) {}

  ngOnInit() {
    this.loadPendingTransfers();
  }

  loadPendingTransfers() {
    
    const sortedTransfers = this.transferService
      .getTransfers()
      .filter(t => t.status !== 'Pending')
      .sort((a, b) => {
        
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    
    this.pendingTransfersSubject.next(sortedTransfers);
  }

  getUserFullName(userId: string): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u:any) => u.id === userId);

    if (user) {
      return user.firstName + ' ' + user.lastName;
    }
    return 'Unknown User';
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

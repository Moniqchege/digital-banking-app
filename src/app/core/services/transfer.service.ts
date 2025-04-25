import { Injectable } from '@angular/core';
import { Transfer } from '../models/transfer.model';
import { Transaction } from '../models/transaction.model';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class TransferService {
  private key = 'transfers';
  private transfers: Transfer[] = [];

  constructor(
    private notificationService: NotificationService
  ){}

  getTransfers(): Transfer[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getTransfersByUser(userId: string): Transfer[] {
    return this.getTransfers().filter(t => t.userId === userId);
  }

  getPendingTransfers(): Transfer[] {
    return this.getTransfers().filter(t => t.status === 'Pending');
  }

  addTransfer(transfer: Transfer): void {
    const transfers = this.getTransfers();
    transfers.push(transfer);
    localStorage.setItem(this.key, JSON.stringify(transfers));
  }

  updateTransferStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected'): void {
    const transfers = this.getTransfers().map(t =>
      t.id === id ? { ...t, status } : t
    );
    localStorage.setItem(this.key, JSON.stringify(transfers));

    const transfer = transfers.find(t => t.id === id);
    if (transfer) {
      if (status === 'Approved') {
        this.notificationService.addNotification(
          'Transfer Approved',
          `Your transfer of $${transfer.amount} to ${transfer.toAccountName} has been approved.`,
          'success'
        );
      } else if (status === 'Rejected') {
        this.notificationService.addNotification(
          'Transfer Rejected',
          `Your transfer of $${transfer.amount} to ${transfer.toAccountName} has been rejected.`,
          'error'
        );
      }
    }
  }
}


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../../core/models/account.model';
import { Transfer } from '../../../core/models/transfer.model';
import { TransferService } from '../../../core/services/transfer.service';
import { AccountService } from '../../../core/services/accounts.service';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-transfer',
  imports: [FormsModule, CommonModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  userId: string = '';
  userAccounts: Account[] = [];
  fromAccountId: string = '';
  toAccountId: string = '';
  amount: number | null = null;

  transfers: Transfer[] = [];

  constructor(
    private transferService: TransferService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userId = user?.id || '';

    if (this.userId) {
      this.userAccounts = this.accountService
        .getAccountsByUserId(this.userId)
        .filter((a: Account) => a.type === 'Debit' || a.type === 'Savings');
        
        console.log('User Accounts in ngOnInit:', this.userAccounts); 

      this.transfers = this.transferService.getTransfersByUser(this.userId);
    }
  }

  onSubmit() {
    console.log('Form Values:', this.fromAccountId, this.toAccountId, this.amount);
  
    if (
      this.fromAccountId &&
      this.toAccountId &&
      this.amount &&
      this.fromAccountId !== this.toAccountId
    ) {
      const fromAccount = this.userAccounts.find(a => a.id === this.fromAccountId);
      const toAccount = this.userAccounts.find(a => a.id === this.toAccountId);
  
      if (!fromAccount || !toAccount) {
        alert('Invalid account selected.');
        return; 
      }

      if (fromAccount.balance < this.amount) {
        alert('Insufficient funds in the source account!');
        return;
      }
  
      
      const newTransfer: Transfer = {
        id: uuidv4(),
        fromAccount: fromAccount,
        fromAccountName: fromAccount.name,  
        toAccount: toAccount,
        toAccountName: toAccount.name,      
        amount: this.amount,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        userId: this.userId,
      };
  
      this.transferService.addTransfer(newTransfer);
      this.transfers.push(newTransfer);

      fromAccount.balance -= this.amount;  // Deduct from 'from' account
      toAccount.balance += this.amount; 

      this.accountService.updateAccount(fromAccount);
    this.accountService.updateAccount(toAccount);

      this.transferService.updateTransferStatus(newTransfer.id, 'Pending'); 
    this.notificationService.addNotification(
      'Transfer Pending',
      `Your transfer of $${this.amount} to ${toAccount.name} is pending.`,
      'success'
    );
  
      
      this.fromAccountId = '';
      this.toAccountId = '';
      this.amount = null;
    } else {
      alert('Please fill the form correctly.');
    }
  }
  
  
  

  getAccountType(accountId: string): string {
    const account = this.userAccounts.find((a) => a.id === accountId);
    return account ? `${account.type} - $${account.balance}` : 'N/A';
  }
}

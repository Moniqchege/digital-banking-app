import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/accounts.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Account } from '../../../core/models/account.model'; 
import { Transaction } from '../../../core/models/transaction.model';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  fullName = 'Monicah Chege';
  accounts: Account[] = [];
  notifications: Notification[] = [];
  showModal = false;
  transactionType: 'deposit' | 'withdraw' = 'deposit';
  transactionAmount: number = 0;
  currentAccount!: Account;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }

  openTransactionModal(account: Account, type: 'deposit' | 'withdraw') {
    this.currentAccount = account;
    this.transactionType = type;
    this.showModal = true;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  processTransaction() {
    if (this.transactionAmount <= 0) {
      alert('Amount should be greater than 0');
      this.notificationService.addNotification(
        'Transaction Failed',
        'Attempted transaction with amount less than or equal to zero.',
        'error'
      );
      return;
    }
  
    const transactionType: 'Deposit' | 'Withdrawal' = this.transactionType === 'deposit' ? 'Deposit' : 'Withdrawal';
    let success = true;
    let failureReason = '';
  
    if (transactionType === 'Deposit') {
      this.currentAccount.balance += this.transactionAmount;
    } else {
      if (this.currentAccount.balance >= this.transactionAmount) {
        this.currentAccount.balance -= this.transactionAmount;
      } else {
        success = false;
        failureReason = 'Insufficient balance';
        alert(failureReason);
      }
    }
  
    if (success) {
      this.accountService.updateAccount(this.currentAccount);
  
      const newTransaction: Transaction = {
        name: `${this.currentAccount.type} ${transactionType}`,
        date: new Date().toISOString().split('T')[0],
        type: transactionType,
        status: 'Completed',
        amount: this.transactionAmount,
        category: transactionType === 'Deposit' ? 'Deposit' : 'Withdraw',
      };
  
      this.transactionService.addTransaction(newTransaction);
      this.toggleModal();
  
      alert(`${transactionType} successful!`);
    }
  
    this.notificationService.addNotification(
      `${transactionType} ${success ? 'Successful' : 'Failed'}`,
      success
        ? `You ${transactionType === 'Deposit' ? 'deposited' : 'withdrew'} KES ${this.transactionAmount.toFixed(2)} on ${new Date().toLocaleDateString()}.`
        : `Failed to ${transactionType.toLowerCase()}: ${failureReason}`,
      success ? 'success' : 'error'
    );
  }
  

  formatAmount(amount: number): string {
    return `KES ${amount.toFixed(2)}`;
  }

  addNewAccount(account: Account) {
    this.accountService.addAccount(account);
    this.accounts = this.accountService.getAccounts(); 
  }
}

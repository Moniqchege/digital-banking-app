import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/accounts.service';
import { Account } from '../../../core/models/account.model';

interface BankAccount {
  id: string;
  name: string;
  type: 'Savings' | 'Checking';
  frozen: boolean;
  balance: number;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  bankAccounts: Account[] = [];
  showAccountForm = false;
  selectedAccount: Account = this.getEmptyAccount();

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.bankAccounts = this.accountService.getAccounts();
  }

  editAccount(account: Account) {
    this.selectedAccount = { ...account };
    this.showAccountForm = true;
  }

  updateAccount() {
    this.accountService.updateAccount(this.selectedAccount);
    this.bankAccounts = this.accountService.getAccounts(); 
    this.closeModal();
  }

  toggleFreeze(account: Account) {
    const updated = { ...account, frozen: !account.frozen };
    this.accountService.updateAccount(updated);
    this.bankAccounts = this.accountService.getAccounts();
  }

  closeModal() {
    this.showAccountForm = false;
    this.selectedAccount = this.getEmptyAccount();
  }

  getEmptyAccount(): Account {
    return {
      id: '',
      userId: '',
      name: '',
      mask: '',
      type: 'Savings',
      frozen: false,
      balance: 0
    };
  }

  formatAmount(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
  
}

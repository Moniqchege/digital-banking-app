import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface BankAccount {
  id: string;
  name: string;
  type: 'Savings' | 'Checking';
  frozen: boolean;
  balance: number;
}

@Component({
  selector: 'app-accounts',
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  bankAccounts: BankAccount[] = [
    {
      id: '1',
      name: 'Alice Doe',
      type: 'Savings',
      frozen: false,
      balance: 10500.25
    },
    {
      id: '2',
      name: 'Bob Smith',
      type: 'Checking',
      frozen: true,
      balance: 3120
    }
  ];

  showAccountForm = false;

  editAccount(account: BankAccount) {
    console.log('Editing account:', account);
    // Open modal or form to update account info
  }

  formatAmount(amount: number): string {
    return 'KES ' + amount.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

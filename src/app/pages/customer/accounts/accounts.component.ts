import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  userName = 'John Doe';
  showModal = false;

  accounts = [
    {
      name: 'Savings',
      accountNumber: '1234567890123456',
      balance: 5000,
      currency: 'USD',
      shareableId: 'XYZ12345',
      mask: '3456'
    },
    {
      name: 'Current',
      accountNumber: '9876543210987654',
      balance: 12000,
      currency: 'USD',
      shareableId: 'XYZ98765',
      mask: '7654'
    },
    {
      name: 'Investment',
      accountNumber: '4567890123456789',
      balance: 20000,
      currency: 'USD',
      shareableId: 'XYZ45678',
      mask: '6789'
    },
  ];

  newAccount = {
    name: '',
    type: '',
    balance: 0
  };

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  createAccount() {
    const mask = Math.floor(1000 + Math.random() * 9000).toString();
    this.accounts.push({
      name: this.newAccount.name,
      accountNumber: '●●●●●●●●●●●●' + mask,
      balance: this.newAccount.balance,
      currency: 'USD',
      shareableId: 'XYZ' + Math.floor(Math.random() * 100000),
      mask
    });

    this.newAccount = { name: '', type: '', balance: 0 };
    this.showModal = false;
  }

  toggleModal():void {
    this.showModal = !this.showModal;
  }
}

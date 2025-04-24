import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions = [
    {
      name: 'Salary',
      date: '2025-04-24',
      type: 'Deposit',
      status: 'Completed',
      amount: 5000
    },
    {
      name: 'Netflix Subscription',
      date: '2025-04-22',
      type: 'Withdrawal',
      status: 'Completed',
      amount: -12.99
    },
    {
      name: 'Transfer to John',
      date: '2025-04-21',
      type: 'Transfer',
      status: 'Pending',
      amount: -250
    },
    {
      name: 'Interest',
      date: '2025-04-20',
      type: 'Deposit',
      status: 'Completed',
      amount: 5.75
    }
  ];

  formatAmount(amount: number): string {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
    return amount > 0 ? `+${formatted}` : formatted;
  }
}

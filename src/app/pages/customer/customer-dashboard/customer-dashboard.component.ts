import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/accounts.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { DoughnutChartComponent } from "../../../doughnut-chart/doughnut-chart.component";
import { Account } from '../../../core/models/account.model';
import { Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule, FormsModule, DoughnutChartComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  user: any = null;
  deactivatedMessage: string | null = null;
  userAccounts: Account[] = [];
  recentTransactions: Transaction[] = [];
  currentBalance: number = 0;
  accountStatusData: any;
  accountStatusOptions: any;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadAccounts();
    this.loadTransactions();
    this.setupChartData();
  }

  loadUserData(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
  }

  loadAccounts(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id;
      
      this.userAccounts = this.accountService
        .getAccounts()
        .filter(account => account.userId === userId);

      
      this.currentBalance = this.userAccounts.reduce((total, account) => total + account.balance, 0);
    }
  }

  loadTransactions(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id;
  
      this.transactionService.getTransactions().subscribe(transactions => {
        
        this.recentTransactions = transactions
          .filter(transaction => transaction.userId === userId)
          .slice(0, 5); 
      });
    }
  }
  

  setupChartData() {
    this.accountStatusData = {
      labels: this.userAccounts.map(account => account.name),
      datasets: [{
        data: this.userAccounts.map(account => account.balance),
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }]
    };

    this.accountStatusOptions = {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }

}

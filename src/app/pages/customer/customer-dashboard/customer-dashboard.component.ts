import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { DoughnutChartComponent } from "../../../doughnut-chart/doughnut-chart.component";


@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule, FormsModule, DoughnutChartComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  firstName = 'Monicah';
  lastName = 'Chege';
  currentBalance = 1500000;
  userAccounts = [
    {name: 'Savings', currentBalance: 150000},
    {name: 'Current', currentBalance: 200000},
    {name: 'Investment', currentBalance: 600000}
  ];

  recentTransactions = [
    { accountNo: '123456789', amount: 500, status: 'Success', date: '2025-04-21' },
    { accountNo: '123456789', amount: 200, status: 'Pending', date: '2025-04-20' },
    { accountNo: '123456789', amount: 300, status: 'Rejected', date: '2025-04-19' },
    { accountNo: '123456789', amount: 150, status: 'Success', date: '2025-04-18' },
    { accountNo: '123456789', amount: 50, status: 'Success', date: '2025-04-17' }
  ];

  accountStatusData: any;
  accountStatusOptions: any;


  constructor() { }

  ngOnInit(): void {
    this.setupChartData();
  }

  setupChartData() {
    this.accountStatusData = {
      labels: this.userAccounts.map(account => account.name),
      datasets: [{
        data: this.userAccounts.map(account => account.currentBalance),
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }]
    };

    this.accountStatusOptions = {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        
      }
    }
  }

  
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers = [
    { name: 'Alice Doe', email: 'alice@example.com', active: true },
    { name: 'Bob Smith', email: 'bob@example.com', active: false }
  ];

  viewCustomer(customer: any) {
    console.log('View:', customer);
  }

  toggleStatus(customer: any) {
    customer.active = !customer.active;
  }

  editCustomer(customer: any) {
    console.log('Edit:', customer);
  }
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  imports: [ FormsModule, CommonModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  // Object to hold transfer details
  transfer = {
    accountNumber: '',
    amount: null
  };

  constructor(private router: Router) {}

  // Method to handle form submission
  onSubmit(transferForm: any) {
    if (transferForm.valid) {
      // Proceed with the transfer logic
      this.processTransfer();
    } else {
      // Display an alert or message if form is invalid
      alert('Please fill in the form correctly.');
    }
  }

  // Mock function to process the transfer
  processTransfer() {
    const { accountNumber, amount } = this.transfer;

    // Here you can handle the actual logic for transferring the funds
    // For now, we will just simulate a successful transfer with an alert
    alert(`Successfully transferred $${amount} to account number ${accountNumber}`);

    // Redirect to another page (e.g., account or transactions page)
    this.router.navigate(['/customer/transactions']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = 'John Doe';   // Example user name
  userEmail: string = 'johndoe@example.com';  // Example email
  userPhone: string = '+1234567890';  // Example phone number
  userAddress: string = '123 Main St, City, Country';  // Example address

  constructor() { }

  ngOnInit(): void {
    // Here you can fetch the profile data from an API or local storage
  }

  saveChanges() {
    console.log('Profile updated:', this.userName, this.userEmail, this.userPhone, this.userAddress);
  }
}

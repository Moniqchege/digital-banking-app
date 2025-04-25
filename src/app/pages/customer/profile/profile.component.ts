import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName = '';
  userEmail = '';
  userPhone = '';
  userAddress = '';

  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    // this.user = this.userService.loggedInUserSubject.value;
    
    this.userService.loggedInUser$.subscribe(user => {
      if (user) {
        this.userName = user.name || '';
        this.userEmail = user.email || '';
        this.userPhone = user.phone || '';
        this.userAddress = user.address || '';
      }
    });
  }

  saveChanges() {
    const updatedUser = {
      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone,
      address: this.userAddress,
      role: 'User'
    };

    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    
    const index = users.findIndex((u: any) => u.email === this.userEmail);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(users[index]));
      this.userService.refreshUser(users[index]);  
    }
  }
}

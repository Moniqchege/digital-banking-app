import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AccountService } from '../../../core/services/accounts.service';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  users: any[] = [];

  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.users = this.getAllUsers();
  }

  getAllUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
  }

  toggleStatus(user: any) {
    user.active = !user.active;
    const users = this.getAllUsers();
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }

    const statusMessage = user.active ? 'activated' : 'deactivated';
    alert(`User account has been ${statusMessage}`);
  }

  getAccountCount(userId: string): number {
    const accounts = this.accountService.getAccountsByUserId(userId);
    return accounts.length;
  }  

}

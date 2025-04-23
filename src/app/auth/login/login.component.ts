import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showRegisterForm = signal<boolean>(false);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  customerObj: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    userAddress: { city: '', state: '', pincode: '', addressLine: '' }
  };

  loginObj = { email: '', password: '' };

  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onLogin() {
    this.userService.login(this.loginObj.email, this.loginObj.password).subscribe({
      next: () => {
        alert('Login Successful');
        this.router.navigate(['/dashboard']);
      },
      error: err => alert(err.error?.message || 'Login failed')
    });
  }

  onRegister() {
    this.userService.register(this.customerObj).subscribe({
      next: () => {
        alert('Registration Successful');
        this.showRegisterForm.set(false);
      },
      error: err => alert(err.error?.message || 'Registration failed')
    });
  }
}

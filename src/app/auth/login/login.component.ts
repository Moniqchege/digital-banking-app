import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userRole: string = '';
  showRegisterForm = signal<boolean>(false);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  customerObj: any = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer' 
  };

  loginObj: any = {
    email: '',
    password: ''
  };

  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onLogin() {
    try {
      const user = this.userService.login(this.loginObj.email, this.loginObj.password);
      if (user.role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    } catch (error: any) {
      alert(error.message);
    }
    
  }

  onRegister() {
    try {
      this.customerObj.role = 'Customer';
      this.customerObj.id = ''; 
  
      this.userService.register(this.customerObj);
  
      alert('Registration Successful!');
      this.showRegisterForm.set(false);
    } catch (err: any) {
      alert(err.message);
    }
  }
  
}

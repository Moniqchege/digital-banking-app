import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'digital-banking-app';

  userRole: string | null = null;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      if (user) {
        this.userRole = user.role;
        this.isLoggedIn = true;
      } else {
        this.userRole = '';
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  
}

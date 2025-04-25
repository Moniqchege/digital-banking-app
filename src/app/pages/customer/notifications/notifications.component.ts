import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'] 
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;
  isAdmin = false;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.userService.loggedInUser$.subscribe(user => {
      if (user) {
        this.loadNotifications(user.id); 
      }
    });
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notifs) => {
      this.notifications = [...notifs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      this.unreadCount = this.notifications.filter((n) => !n.read).length;

      const user = this.userService.getLoggedInUser();
    this.isAdmin = user?.role === 'admin';  

    this.loadNotifications(user.id);
    });
  }

  loadNotifications(userId: string) {
    if (this.isAdmin) {
      return;
    }

    const stored = localStorage.getItem(`notifications_${userId}`);
  if (stored) {
    this.notifications = JSON.parse(stored);
    // this.notifications.next(this.notifications);
  }

    this.notificationService.getNotifications().subscribe((notifs) => {
      this.notifications = [...notifs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    });
  }
  

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    }
  }
}

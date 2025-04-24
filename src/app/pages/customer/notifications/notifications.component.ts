import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'] 
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
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

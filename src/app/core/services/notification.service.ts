import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.model';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationSubject = new BehaviorSubject<Notification[]>([]);

  constructor(private userService: UserService) {
    this.userService.loggedInUser$.subscribe((user) => {
      if (user) {
        this.loadNotifications(user.id);
      } else {
        this.notifications = [];
        this.notificationSubject.next(this.notifications);
      }
    });
  }

  loadNotifications(userId: string) {
    const stored = localStorage.getItem(`notifications_${userId}`);
    if (stored) {
      this.notifications = JSON.parse(stored);
      this.notificationSubject.next(this.notifications);
    }
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

  addNotification(title: string, message: string, type: 'success' | 'error') {
    const user = this.userService.getLoggedInUser();
    if (!user || user.role === 'admin') return; // Don't add notifications for admin users

    const newNotif: Notification = {
      id: uuidv4(),
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type,
    };

    const storedNotifications = JSON.parse(
      localStorage.getItem(`notifications_${user.id}`) || '[]'
    );
    storedNotifications.unshift(newNotif);
    localStorage.setItem(
      `notifications_${user.id}`,
      JSON.stringify(storedNotifications)
    );

    this.notifications.unshift(newNotif);
    this.notificationSubject.next(this.notifications);
  }

  markAsRead(id: string) {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    this.updateStorage();
  }

  private updateStorage() {
    const user = this.userService.getLoggedInUser();
    if (user) {
      localStorage.setItem(
        `notifications_${user.id}`,
        JSON.stringify(this.notifications)
      );
      this.notificationSubject.next(this.notifications);
    }
  }
}

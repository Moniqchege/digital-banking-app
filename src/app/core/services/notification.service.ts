import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationSubject = new BehaviorSubject<Notification[]>([]);

  constructor() {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      this.notifications = JSON.parse(stored);
      this.notificationSubject.next(this.notifications);
    }
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

  addNotification(title: string, message: string, type: 'success' | 'error') {
    const newNotif: Notification = {
      id: uuidv4(),
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type
    };
    this.notifications.unshift(newNotif); 
    this.updateStorage();
  }

  markAsRead(id: string) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
    this.updateStorage();
  }

  private updateStorage() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    this.notificationSubject.next(this.notifications);
  }
}

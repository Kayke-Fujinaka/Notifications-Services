import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repository';

export class inMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === id);
    return !notification ? null : notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}

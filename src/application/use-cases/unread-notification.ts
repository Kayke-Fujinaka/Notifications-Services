import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notifications-not-found';

interface UnreadNotificationRequest {
  id: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFound();

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}

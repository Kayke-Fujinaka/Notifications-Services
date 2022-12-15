import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notifications-not-found';

interface ReadNotificationRequest {
  id: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}

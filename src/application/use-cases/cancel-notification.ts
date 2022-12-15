import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notifications-not-found';

interface CancelNotificationRequest {
  id: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}

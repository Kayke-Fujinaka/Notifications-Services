import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notifications-not-found';

describe('Cancel Notification', () => {
  it('should able to cancel a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'test-example-id',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      id: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

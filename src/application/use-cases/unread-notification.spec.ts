import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should able to unread a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      id: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

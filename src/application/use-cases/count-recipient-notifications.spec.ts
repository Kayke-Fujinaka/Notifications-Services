import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count Recipients Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });

  it('should be return count recipient notifications as zero', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(0);
  });
});

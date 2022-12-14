import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const NotificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send Notification', () => {
  it('should able to send a notification', async () => {
    const sendNotification = new SendNotification(NotificationsRepository);

    await sendNotification.execute({
      category: 'social',
      content: 'This is a notification',
      recipientId: 'test-recipient-id',
    });

    expect(notifications).toHaveLength(1);
  });
});

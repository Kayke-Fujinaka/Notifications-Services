import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  imports: [],
  providers: [KafkaConsumerService],
  controllers: [NotificationsController],
})
export class MessagingModule {}

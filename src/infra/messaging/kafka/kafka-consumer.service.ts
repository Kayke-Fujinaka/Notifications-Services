import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['touching-seahorse-9641-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'dG91Y2hpbmctc2VhaG9yc2UtOTY0MSTjLW1uIj5li2i7fJt83R7KGwFf_6J2lBk',
          password:
            '-Z85Xh154baVyQ4FWHmk_MCEISBWLyKB_Kp3LJl0nUL66VV0Y_YkBcAHWwIFgav5vAoKOQ==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}

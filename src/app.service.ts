import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthy(): Object {
    return {
      'api': 'v1',
      'appName': process.env.APP_NAME
    };
  }
}

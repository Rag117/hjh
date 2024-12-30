import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 요청(보내기), 응답(보내주기), 예외처리(에러일 경우 어떤 종류로 알려줘야하는지, notfound)
// status code(2--, 4--, 5--)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/test/hi")
  getHello(): string {
    return this.appService.getHello();
  }
}
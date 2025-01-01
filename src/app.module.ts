/*import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MypageService } from './mypage/mypage.service';
import { MypageController } from './mypage/mypage.controller';

@Module({
  imports: [
    BoardModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  // 업로드 파일이 저장되는 폴더의 경로
      serveRoot: '/uploads',  // 클라이언트에서 접근할 경로
    }),
  ],
  controllers: [AppController, MypageController],
  providers: [AppService, MypageService],
})
export class AppModule {}
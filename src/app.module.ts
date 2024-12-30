import { Module } from '@nestjs/common';
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

import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaModule } from 'src/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {}

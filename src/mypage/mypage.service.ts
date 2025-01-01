import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MypageService {
  constructor(private readonly prisma: PrismaService) {}

  // 본인이 작성한 게시물 조회
  async getMyBoards(userId: number) {
    return await this.prisma.board.findMany({
      where: { authorId: userId }, // authorId가 현재 사용자 ID와 일치
      orderBy: { createAt: 'desc' }, // 최신순 정렬
    });
  }

  // 사용자 정보 수정
  async updateUserInfo(userId: number, data: { name?: string; email?: string; password?: string }) {
    const updateData: any = { ...data };

    // 비밀번호 해싱
    if (data.password) {
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }

    return await this.prisma.user.update({
      where: { userId },
      data: updateData,
    });
  }
}

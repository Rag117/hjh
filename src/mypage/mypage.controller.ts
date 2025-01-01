import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.auth.guard';
import { MypageService } from './mypage.service';

@Controller('mypage')
@UseGuards(JwtGuard) // JWT 인증 적용
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  // 본인이 작성한 게시물 조회
  @Get('myboards')
  async getMyBoards(@Request() req) {
    const userId = req.user.id; // JWT에서 사용자 ID 가져오기
    return await this.mypageService.getMyBoards(userId);
  }

  // 사용자 정보 수정
  @Patch('updateinfo')
  async updateUserInfo(
    @Request() req,
    @Body() body: { name?: string; email?: string; password?: string }
  ) {
    const userId = req.user.id;
    return await this.mypageService.updateUserInfo(userId, body);
  }
}

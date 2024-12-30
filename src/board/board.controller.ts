import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { title } from 'process';
import { get } from 'http';
import { JwtGuard } from 'src/auth/jwt.auth.guard';

// Shift + Alt + F: 코드 정렬
// Controll + F: 파일 이동
@Controller('board')
@UseGuards(JwtGuard)
export class BoardController {
    // 요청(--> Service(데이터베이스와 관련된 로직))과 응답
    // 요청 받은 것을 Service에 보내주기(Service 생성자 생성)
    constructor(private readonly boardService: BoardService) { }

    //post는 요청을 body에 담아서 보냄
    //get 방식은 안정성이 떨어짐
    @Post()
    async createBoard(@Body('title') title: string, @Body('description') description: string, @Body('author') author: string) {
        return await this.boardService.createBoard(title, description, author);
    }

    @Get()
    async getAll(){
        return await this.boardService.getAll();
    }

    //Param은 String으로 형변환 시키므로 PaseIntPipe로 다시 형변환시켜야함.
    @Get(':boardId')
    async getBoardById(@Param('boardId', ParseIntPipe) boardId: number){
        return await this.boardService.getBoardById(boardId);
    }

    @Post('/update')
    async updateBoard(@Body('title') title: string, @Body('description') description: string, @Body('author') author: string, @Body('boardId') boardId: number){
        return await this.boardService.updateBoard(title, description, author, boardId)
    }

    @Post('/delete')
    async deleteBoard(@Body('boardId') boardId: number){
        return await this.boardService.deleteBoard(boardId)
    }
}
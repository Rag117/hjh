import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
    constructor(private readonly prisma: PrismaService) { }
    async createBoard(title: string, description: string, author: string){
        return await this.prisma.board.create({
            data:{
                title, 
                description, 
                author
            }
        })
    }
    async getAll(){
        return await this.prisma.board.findMany({})
    }

    //where는 특정 조건 부여(원하는 것만 추출)
    async getBoardById(boardId: number){
        // 조회수 증가 & 게시물을 반환
        await this.prisma.board.update({
            where: { boardId },
            data: { views: { increment: 1 }}
        });

        return await this.prisma.board.findMany({
            where: {boardId}
        })
    }

    async updateBoard(title: string, description: string, author: string, boardId: number){
        return await this.prisma.board.update({
            where: {boardId},
            data: {
                title,
                description,
                author
            }
        })
    }

    async deleteBoard(boardId: number){
        return await this.prisma.board.delete({
            where: {boardId}
        })
    }

    // 좋아요 증가
    async incrementLikes(boardId: number) {
        return await this.prisma.board.update({
            where: { boardId },
            data: { likes: {increment: 1}}
        })
    }
}

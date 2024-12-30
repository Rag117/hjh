import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { error } from 'console';
import { privateDecrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService) { }

    async registerUser(registerUserDto: RegisterUserDto){
        try{
            const vaild = await this.prisma.user.findUnique({
                where: {id: registerUserDto.id}
            });

            // 값이 있으면 X
            if(vaild){
                throw new Error('user exist')
            }
            
            // ...: 스프레드 문법
            return await this.prisma.user.create({
                data: {...registerUserDto}    
            })

        }catch(error){throw error}
    }

    async generateJwtToken(id: string){
        const payload = { id };
        return this.jwtService.sign(payload);
    }

    async getUserByIdAndPassword(id: string, password: string) {
        return await this.prisma.user.findFirst ({
            where: { id, password}
        })
    }
}

import { Body, Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        try {
            const { profileImage } = registerUserDto;

            // 전달된 프로필 이미지 경로
            const imagePath = join(__dirname, '..', 'uploads', profileImage.replace('/uploads/', ''));

            // 프로필 이미지 파일이 존재하는지 확인
            if (profileImage && !existsSync(imagePath)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: '프로필 이미지 파일이 존재하지 않습니다.',
                });
            }

            // 사용자 등록
            const newUser = await this.authService.registerUser({
                ...registerUserDto,
                profileImage, // 이미지 경로
            });

            const token = await this.authService.generateJwtToken(newUser.id); // JWT 토큰 생성

            return res.status(HttpStatus.CREATED).json({
                message: '회원가입 성공',
                token,
                userData: newUser,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: '회원가입 실패',
                error: error.message,
            });
        }
    }

    /*async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        try {
            const newUser = await this.authService.registerUser(registerUserDto);
            const token = await this.authService.generateJwtToken(newUser.id);
            res.status(201).json({
                message: '회원가입 성공',
                token: token,
                userData: newUser
            })
        }
        catch (error) {
            res.status(501).json({
                message: '회원가입 실패',
                error: error.message
            })
        }
    }*/

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        const { id, password } = loginUserDto
        const user = await this.authService.getUserByIdAndPassword(id, password)

        if (user) {
            const token = await this.authService.generateJwtToken(user.id)
            res.json({
                message: '로그인 성공',
                needRegister: false,
                token,
                userData: user,
            });
        }
        else {
            res.json({
                message: '로그인 실패',
                needRegister: true,
            });
        }
    }
}

//클래스 이름은 대문자로!!
import { IsString } from "class-validator";

export class RegisterUserDto {
   
    @IsString()
    id: string;

    @IsString()
    name: string

    @IsString()
    password: string

    @IsString()
    email: string

    @IsString()
    phone: string

    // npm -i -D @types/multer
    // npm install @jestjs/platform-express multer

    @IsString()
    profileImage?: string; // 이미지의 경로 저장     
}
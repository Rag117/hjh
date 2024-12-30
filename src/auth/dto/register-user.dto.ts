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
}
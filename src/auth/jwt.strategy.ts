import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// 의존성 주입이 가능한 클래스 만듦 == 다른 곳에서도 쓸 수 있게
// npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
// npm install @types/passport-jwt
// npm install @nestjs/config 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    // configservice: 파일을 전역으로 불러오기 위한 전역 파라미터
    // jwtFromRequest: 토큰 불러오기
    // ignoreExporation: 토큰 만료되는 시간
    // secretOrKey: 비밀키

    constructor(private configservice: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExporation: false,
            secretOrKey: configservice.get<string>('JWT_SECRET')
        })
    }
    
    // 토큰 검증
    // any는 모든 타입: 하나하나 다 검증
    async validate(payload: any){
        if(!payload.id){
            throw new UnauthorizedException('Invaild Token payload')
        }
        return {id: payload.id}
    }
}
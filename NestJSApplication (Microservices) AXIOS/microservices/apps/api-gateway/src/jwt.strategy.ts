import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secretOrKey:'MAKANNASIPADANGPAKERENDANGSANGATENAK'
    });
  }

  async validate(payload:any){
    console.log('Sampe Di Validate guard')
    console.log('id:',payload.payload.id)
    console.log('email:',payload.payload.email)
    return {userid:payload.payload.id,email:payload.payload.email}
  }
}


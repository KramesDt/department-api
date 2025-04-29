import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../configs/config';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy as any) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}

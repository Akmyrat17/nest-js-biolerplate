import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InvalidCredentialsException } from 'src/common/http/exceptions/invalid-credentials.exception';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';

type payload = {
  username: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: payload) {
    const user = await this.usersRepository.findOne({
      where: { username: payload.username },
    });
    if (!user) throw new InvalidCredentialsException();
    return user;
  }
}

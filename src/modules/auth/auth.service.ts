import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserLoginDto } from './dtos/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from 'src/common/http/exceptions';
import { BcryptHelper } from 'src/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repositories/users.repository';
import { UserRegisterDto } from './dtos/user-register.dto';
import { responseMessage } from 'src/common/http/custom.response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  async register(registerDto: UserRegisterDto) {
    const user = this.usersRepository.create(registerDto);
    user.password = await BcryptHelper.hashPassword(user.password);
    await this.usersRepository.save(user);
    const token = await this.tokenSign(user.username);
    return responseMessage({ action: 'success', data: token });
  }
  async login(loginDto: UserLoginDto) {
    const { phone_number, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { phone_number },
    });
    if (!user) throw new UserNotFoundException();
    const compared = BcryptHelper.comparePassword(password, user.password);
    if (!compared) throw new UserNotFoundException();
    const token = await this.tokenSign(user.username);
    await this.cacheManager.set(user.username, token);
    return responseMessage({ action: 'success', data: { token } });
  }

  async tokenSign(username: string) {
    const expiresIn = this.config.get('JWT_TTL');
    const secretOrKey = this.config.get('JWT_SECRET');
    const payload = { username };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: secretOrKey,
    });
    return token;
  }
}

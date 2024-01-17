import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../dto/auth.dto';
import { User } from '../../modules/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({ username, password }: AuthDto) {
    const user = await this.userService.findByUsername(username);

    if (username === user?.username && password === user?.password) {
      return { username: user.username, isAdmin: user.isAdmin };
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, isAdmin: user.isAdmin };
    const token = await this.jwtService.sign(payload);

    return { token, user };
  }
}

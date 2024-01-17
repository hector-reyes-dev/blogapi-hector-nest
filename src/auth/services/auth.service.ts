import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../modules/users/services/users.service';
import { User } from '../../modules/users/schemas/user.schema';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({ username, password }: AuthDto) {
    const user = await this.userService.findByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (username === user?.username && isPasswordMatch) {
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

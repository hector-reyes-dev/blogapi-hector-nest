import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (username === user?.username && password === user?.password) {
      return { username: user.username, isAdmin: user.isAdmin };
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, isAdmin: user.isAdmin };

    return { token: this.jwtService.sign(payload) };
  }
}

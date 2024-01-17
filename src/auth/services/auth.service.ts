import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (username === user?.username && password === user?.password) {
      return { username: user.username, isAdmin: user.isAdmin };
    }

    return user;
  }
}

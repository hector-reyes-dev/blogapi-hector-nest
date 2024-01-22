import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');

    if (!token) return false;

    try {
      const decodedToken = this.jwtService.verify(token);
      const tokenId = decodedToken && decodedToken.id;
      const requestedUserId = request.params.id;

      return tokenId === requestedUserId;
    } catch (error) {
      return false;
    }
  }
}

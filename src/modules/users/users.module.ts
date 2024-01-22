import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { IsOwnerGuard } from './../../common/guards/is-owner.guard';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secret,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [UsersService, IsOwnerGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

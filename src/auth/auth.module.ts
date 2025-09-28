import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import  {User} from './entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './constants/jwt.constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: JWT_KEY,
    signOptions : {
      expiresIn : EXPIRES_IN,
    }
  })
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}


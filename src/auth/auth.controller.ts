import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body () createUserDto : CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body()  updateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
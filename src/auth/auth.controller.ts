import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Authentication')
@ApiAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Create a new user account with email, password and role'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    example: { message: 'User registered successfully', userId: '123e4567-e89b-12d3-a456-426614174000' }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data' 
  })
  @Post('signup')
  signup(@Body () createUserDto : CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate user with email and password, returns JWT token'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    example: { 
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: { userId: '123e4567-e89b-12d3-a456-426614174000', email: 'user@oxxo.com', roles: ['Employee'] }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid credentials' 
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiOperation({ 
    summary: 'Update user information',
    description: 'Update user data by email address'
  })
  @ApiParam({ 
    name: 'email', 
    description: 'Email address of the user to update',
    example: 'user@oxxo.com'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User updated successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found' 
  })
  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body()  updateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
import { Controller, Post, Body, Patch, Param, Res, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';

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
  
  @Post('register/:id')
  registerViaParam(
    @Param('id') id: string,
    @Query('role') role: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    const r = (role || '').toLowerCase();
    if (r !== 'employee' && r !== 'manager') {
      throw new BadRequestException("Invalid role. Use 'employee' or 'manager'.");
    }
    createUserDto.userRoles = [r === 'employee' ? 'Employee' : 'Manager'];
    return r === 'employee'
      ? this.authService.registerEmployee(id, createUserDto)
      : this.authService.registerManager(id, createUserDto);
  }

  // Keep a single, clean register endpoint using path param and role query
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
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { token } = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { access_token: token };
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

  // Update user by ID (recommended for frontend)
  @Patch('users/:id')
  updateUserById(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUserById(userId, updateUserDto);
  }
}
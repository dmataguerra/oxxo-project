import { Controller, Patch, Param, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUserById(id, dto);
  }
}

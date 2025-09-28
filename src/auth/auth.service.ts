import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository : Repository<User>, private jwtService : JwtService,) {}
  registerUser(createUserDto : CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }
  
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where : {
        userEmail : loginUserDto.userEmail
      }
    }); 
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = bcrypt.compareSync(loginUserDto.userPassword, user.userPassword);
    
    if(!match) {
      return { message : "Invalid credentials" }
    }

    const token = this.jwtService.sign({ userId : user.userId, userEmail : user.userEmail});
    return { token }; 
    //return { message : "Login successful" }
  }
}

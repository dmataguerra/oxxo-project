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

    const token = this.jwtService.sign({ 
      userId: user.userId, 
      userEmail: user.userEmail, 
      userRoles: user.userRoles 
    });
    return { token }; 
    //return { message : "Login successful" }
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userEmail: email } });
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    });
    
    if (!newUserData) {
      throw new NotFoundException('User not found');
    }
    
    return await this.userRepository.save(newUserData);
  }
}

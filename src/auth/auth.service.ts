import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    private jwtService: JwtService,
  ) { }

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles || [];
    if (roles.includes('Admin') || roles.includes('Manager')) {
      throw new BadRequestException('Invalid role for employee');
    }

    return this.userRepository.manager.transaction(async (trx) => {
      const empRepo = trx.getRepository(Employee);
      const userRepo = trx.getRepository(User);

      const employee = await empRepo.findOne({ where: { id }, relations: { user: true } });
      if (!employee) throw new NotFoundException('Employee not found');
      if (employee.user) throw new ConflictException('Employee already has a user');

      const existingEmail = await userRepo.findOne({ where: { userEmail: createUserDto.userEmail } });
      if (existingEmail) throw new ConflictException('Email already in use');

      const toSave = userRepo.create({
        userEmail: createUserDto.userEmail,
        userPassword: bcrypt.hashSync(createUserDto.userPassword, 5),
        userRoles: ['Employee']
      });
      const saved = await userRepo.save(toSave);
      employee.user = saved;
      await empRepo.save(employee);
      return { message: 'User created and linked to employee', user: saved };
    });
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles || [];
    if (roles.includes('Admin') || roles.includes('Employee')) {
      throw new BadRequestException('Invalid role for manager');
    }

    return this.userRepository.manager.transaction(async (trx) => {
      const mgrRepo = trx.getRepository(Manager);
      const userRepo = trx.getRepository(User);

      const manager = await mgrRepo.findOne({ where: { managerId: id }, relations: { user: true } });
      if (!manager) throw new NotFoundException('Manager not found');
      if (manager.user) throw new ConflictException('Manager already has a user');

      const existingEmail = await userRepo.findOne({ where: { userEmail: createUserDto.userEmail } });
      if (existingEmail) throw new ConflictException('Email already in use');

      const toSave = userRepo.create({
        userEmail: createUserDto.userEmail,
        userPassword: bcrypt.hashSync(createUserDto.userPassword, 5),
        userRoles: ['Manager']
      });
      const saved = await userRepo.save(toSave);
      manager.user = saved;
      await mgrRepo.save(manager);
      return { message: 'User created and linked to manager', user: saved };
    });
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = bcrypt.compareSync(loginUserDto.userPassword, user.userPassword);

    if (!match) {
      return { message: "Invalid credentials" }
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

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    });

    if (!newUserData) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.save(newUserData);
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }
    const newUserData = await this.userRepository.preload({
      userId,
      ...updateUserDto,
    });
    if (!newUserData) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.save(newUserData);
  }
}

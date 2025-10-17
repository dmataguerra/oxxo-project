import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {Manager} from "./entities/manager.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager) 
    private managerRepository: Repository<Manager>
  )
  {}
  async create(createManagerDto: CreateManagerDto) {
    const manager = this.managerRepository.create({
      ...createManagerDto,
      user: createManagerDto.userId ? { userId: createManagerDto.userId } as any : undefined,
    });
    return this.managerRepository.save(manager);
  }

  findAll() {
    return this.managerRepository.find({
      relations: ['location', 'user']
    });
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: { managerId: id },
      relations: ['location', 'user']
    });
    
    if (!manager) {
      throw new NotFoundException("Manager not found");
    }
    
    return manager; 
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const { userId, ...managerData } = updateManagerDto;
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...managerData,
      user: userId ? { userId } as any : undefined,
    });
    if(!managerToUpdate) throw new NotFoundException("Manager not found");
    return this.managerRepository.save(managerToUpdate);
  }

  remove(id: string) {
    return this.managerRepository.delete({ managerId: id })
  }
}

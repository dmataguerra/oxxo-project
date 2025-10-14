import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create({
      ...createLocationDto,
      manager: createLocationDto.managerId ? { managerId: createLocationDto.managerId } as any : undefined,
      region: createLocationDto.regionId ? { regionId: createLocationDto.regionId } as any : undefined,
    });
    return this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find();
  }


  findOne(id: number) {
    const location = this.locationRepository.findOneBy({ 
      locationId: id 
    });
    if(!location) {
        throw new NotFoundException('Location not found');
    } 
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
      manager: updateLocationDto.managerId ? { managerId: updateLocationDto.managerId } as any : undefined,
      region: updateLocationDto.regionId ? { regionId: updateLocationDto.regionId } as any : undefined,
    });
    
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    
    return this.locationRepository.save(location);
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id })
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
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
    // Si se proporciona managerId, validar que existe y no esté asignado a otra location
    if (createLocationDto.managerId) {
      const manager = await this.managerRepository.findOne({
        where: { managerId: createLocationDto.managerId },
        relations: ['location']
      });

      if (!manager) {
        throw new NotFoundException(`Manager with ID ${createLocationDto.managerId} not found`);
      }

      // Verificar si el manager ya está asignado a otra location
      if (manager.location) {
        const existingLocationId = typeof manager.location === 'string' 
          ? manager.location 
          : manager.location.locationId;
        throw new BadRequestException(
          `Manager ${createLocationDto.managerId} is already assigned to location ${existingLocationId}`
        );
      }
    }

    const location = this.locationRepository.create({
      ...createLocationDto,
      manager: createLocationDto.managerId ? { managerId: createLocationDto.managerId } as any : undefined,
      region: createLocationDto.regionId ? { regionId: createLocationDto.regionId } as any : undefined,
    });
    
    return this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find({
      relations: ['manager', 'region', 'employees']
    });
  }


  async findOne(id: number) {
    const location = await this.locationRepository.findOne({ 
      where: { locationId: id },
      relations: ['manager', 'region', 'employees']
    });
    
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // Verificar que la ubicación existe
    const existingLocation = await this.locationRepository.findOne({
      where: { locationId: id },
      relations: ['manager']
    });
    
    if (!existingLocation) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    // Si se está actualizando el managerId, validar
    if (updateLocationDto.managerId !== undefined) {
      // Si se está asignando un nuevo manager (no null)
      if (updateLocationDto.managerId) {
        const manager = await this.managerRepository.findOne({
          where: { managerId: updateLocationDto.managerId },
          relations: ['location']
        });

        if (!manager) {
          throw new NotFoundException(`Manager with ID ${updateLocationDto.managerId} not found`);
        }

        // Verificar si el manager ya está asignado a OTRA location (no a esta misma)
        if (manager.location) {
          const existingLocationId = typeof manager.location === 'string' 
            ? manager.location 
            : manager.location.locationId;
          
          // Solo lanzar error si está asignado a una location diferente
          if (existingLocationId !== id) {
            throw new BadRequestException(
              `Manager ${updateLocationDto.managerId} is already assigned to location ${existingLocationId}`
            );
          }
        }
      }
    }

    // Actualizar usando preload
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
      manager: updateLocationDto.managerId ? { managerId: updateLocationDto.managerId } as any : undefined,
      region: updateLocationDto.regionId ? { regionId: updateLocationDto.regionId } as any : undefined,
    });
    
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found after preload`);
    }
    
    return this.locationRepository.save(location);
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id })
  }
}

import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Product } from '../products/entities/product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from 'src/auth/constants/jwt.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Product]), JwtModule.register({
    secret :  JWT_KEY,
    signOptions : {
      expiresIn : EXPIRES_IN,
    }
  })],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './auth/constants/jwt.constants';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
        signOptions : {
          expiresIn : EXPIRES_IN,
        }
        }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +(process.env.DB_PORT || 5432),
      username: 'postgres',
      password: process.env.PASS,
      database: process.env.NAME,
      entities: [],
      autoLoadEntities: true, 
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

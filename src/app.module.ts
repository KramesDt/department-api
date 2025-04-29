import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: process.env.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    AuthModule,
    DepartmentModule,
  ],
})
export class AppModule {}

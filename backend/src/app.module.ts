import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { Book } from './books/entities/book.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(ConfigService: ConfigService)=>({
        type:'postgres',
        host:ConfigService.get('DB_HOST'),
        port:ConfigService.get('DB_PORT'),
        username:ConfigService.get('DB_USERNAME'),
        password:ConfigService.get('DB_PASSWORD'),
        database:ConfigService.get('DB_NAME'),
        entities:[User, Book],
        synchronize:true
      })
    }),
    BooksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

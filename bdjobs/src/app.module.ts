import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SkillModule } from './skill/skill.module';
import { UserSkillModule } from './user-skill/user-skill.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot(
        {
          isGlobal: true,
          envFilePath : ".local.env",
          //envfilePath : ".prod.env",
        }
      )],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SkillModule,
    UserSkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
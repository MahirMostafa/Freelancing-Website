import { Module } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { UserSkillController } from './user-skill.controller';
import { UserSkill } from './entities/user-skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill,User,Skill]), UserModule,SkillModule], 
  controllers: [UserSkillController],
  providers: [UserSkillService],
})
export class UserSkillModule {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async create(createUserSkillDto: CreateUserSkillDto): Promise<UserSkill> {
    const user = await this.userRepository.findOne({ where: { id: createUserSkillDto.userId }} as FindOneOptions<User>);
const skill = await this.skillRepository.findOne({ where: { id: createUserSkillDto.skillId }} as FindOneOptions<Skill>);
    if (!user) {
      throw new NotFoundException(`User with ID ${createUserSkillDto.userId} not found`);
    }

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${createUserSkillDto.skillId} not found`);
    }

    const newUserSkill = this.userSkillRepository.create({
      user: user,
      skill: skill,
    });

    await this.userSkillRepository.save(newUserSkill);
    return newUserSkill;
  }

  async findAll(): Promise<UserSkill[]> {
    return this.userSkillRepository.find();
  }
}

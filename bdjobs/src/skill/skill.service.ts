import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const newSkill = this.skillRepository.create(createSkillDto);
    await this.skillRepository.save(newSkill);
    return newSkill;
  }

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async findOne(id: number): Promise<Skill> {
    return this.skillRepository.findOne({where:{id :id}});
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.skillRepository.preload({
      id: +id,
      ...updateSkillDto,
    });
    if (!skill) {
      throw new Error('Skill not found');
    }
    return this.skillRepository.save(skill);
  }

  async remove(id: number): Promise<void> {
    const skill = await this.findOne(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    await this.skillRepository.remove(skill);
  }
}

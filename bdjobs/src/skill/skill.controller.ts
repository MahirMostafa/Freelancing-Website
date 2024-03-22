import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    try {
      return await this.skillService.create(createSkillDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.skillService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const skill = await this.skillService.findOne(+id);
      if (!skill) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }
      return skill;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    try {
      const skill = await this.skillService.update(+id, updateSkillDto);
      if (!skill) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }
      return skill;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const skill = await this.skillService.remove(+id);
      if (skill==null) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }
      return skill;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

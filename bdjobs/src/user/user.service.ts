import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>)
  {
    
  }

  create(createUserDto: CreateUserDto) : Promise<User> {
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.address = createUserDto.address;
    user.role = "User";
    return this.userRepository.save(user);
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({where: {id:id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.role = "User";
    user.id = id;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }
}

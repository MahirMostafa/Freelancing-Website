import { IsNotEmpty } from 'class-validator';

export class CreateUserSkillDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    skillId: number;

}

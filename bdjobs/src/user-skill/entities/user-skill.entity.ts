import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity"
import { Skill } from "../../skill/entities/skill.entity";

@Entity()
export class UserSkill {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Skill)
    @JoinColumn({ name: "skill_id" })
    skill: Skill;
}

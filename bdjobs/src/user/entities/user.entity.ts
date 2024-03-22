import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable: false})
    firstName: string;

    
    @Column({nullable: false})
    lastName: string;

    
    @Column({unique: false, nullable: false})
    email: string;

    
    @Column({nullable: false})
    password: string;
    
    @Column({nullable: false})
    address: string;

    @Column({nullable: true})
    role: string;


}

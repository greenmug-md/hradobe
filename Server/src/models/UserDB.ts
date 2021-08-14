import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
	CANDIDATE = "CANDIDATE",
	COMPANY = "COMPANY"
}

@Entity()
export default class UserDB {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({nullable: false})
	role: Role

	@Column({nullable: false, unique: true})
	username: string

	@Column({nullable: false})
	password: string

	@Column({nullable: false})
	company: string

	@Column({nullable: false})
	email: string

	@Column()
	firstname: string

	@Column()
	lastname: string
}
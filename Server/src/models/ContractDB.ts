import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
	CANDIDATE = "CANDIDATE",
	COMPANY = "COMPANY"
}

export enum status {
	DRAFT = "DRAFT",
	FINALIZED = "FINALIZED",
	APPROVED = "APPROVED",
	SIGNED = "SIGNED"
}

export enum nextstatus {
	FINALIZE = "FINALIZE",
	APPROVE = "APPROVE",
	SIGN="SIGN",
}

@Entity()
export default class ContractDB {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false, unique: true })
	filename: string;

	@Column({ nullable: false })
	userId: string;

	@Column({ nullable: false })
	firstname: string;

	@Column({ nullable: false })
	lastname: string;

    @Column({ nullable: false })
	username: string;

    @Column({ nullable: false })
	email: string;

    @Column({ nullable: false })
	company: string;

    @Column({ nullable: false })
	statuscandidate: string;

    @Column({ nullable: false })
	statuscompany: string;

	@Column({ nullable: true })
	approvedcandidate : boolean;

	@Column({ nullable: true })
	approvedcompany : boolean;

	@Column({ nullable: true })
	signedcandidate : boolean;

	@Column({ nullable: true })
	signedcompany : boolean;

	@Column({ nullable: true })
	signeddocumentcandidate : string;

	@Column({ nullable: true })
	signeddocumentcompany : string;

	@Column({ nullable: true })
	transientid : string;

	@Column({ nullable: true })
	agreementid : string;

    @Column({ nullable: false })
	contractname: string;

	@Column({nullable: false})
	role: Role

	@Column({ nullable: false })
	html: string;
}
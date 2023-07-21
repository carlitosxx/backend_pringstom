import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    first_name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    last_name: string;

    @Column({ type: 'text', unique: true, })
    email: string

    @Column({ type: 'text', unique: true, })
    phone: string

    @Column({ type: 'text', select: false, })
    password: string

    @Column('bool', { default: true, })
    is_active: boolean;

    @Column({ type: 'text', array: true, default: ['user'] })
    roles: string[];

    @Column({ type: 'timestamptz', default: () => 'NOW()', })
    created_at: Date;

    @Column('timestamptz', { default: () => 'NOW()', })
    update_at: Date;

    // HELPERS
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.first_name = this.first_name.toLowerCase().trim();
        this.last_name = this.last_name.toLowerCase().trim();
        this.email = this.email.toLowerCase().trim();
    }
    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}

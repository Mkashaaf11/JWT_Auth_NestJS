import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  email: string;
}

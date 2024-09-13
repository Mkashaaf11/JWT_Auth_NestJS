import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;
}

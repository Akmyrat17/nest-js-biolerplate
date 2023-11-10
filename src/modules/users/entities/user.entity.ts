import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column({
    type: 'integer',
    unique: true,
    nullable: false,
  })
  phone_number: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;
}

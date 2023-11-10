import { UserRoles } from 'src/common/enums/user.roles';
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

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: false,
    default: 'user',
  })
  role: UserRoles;
}

import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isActive: boolean;
}

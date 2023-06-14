import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'players',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
})
export class Player extends Model<Player> {
  @PrimaryKey
  @Column({ autoIncrement: true, unique: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  skill_level: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}

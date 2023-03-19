/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Message } from './Message';
import { Section } from './Section';
import { User } from './User';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'question',
})
export class Question extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING(1024))
  content: string;

  @Column(DataType.STRING)
  time: string;

  @ForeignKey(() => Section)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'section_id',
  })
  sectionId: string;

  @BelongsTo(() => Section)
  section: Section;

  @HasMany(() => Message)
  messages: Message[];
}

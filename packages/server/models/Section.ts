/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Question } from './Question';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'section',
})
export class Section extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @HasMany(() => Question)
  questions: Question[];
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
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

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @HasMany(() => Question)
  questions: Question[];
}

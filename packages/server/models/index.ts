import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { dbConfig } from '../config/db.config';
import { Message } from './Message';
import { Question } from './Question';
import { Section } from './Section';
import { SiteTheme } from './SiteTheme';
import { User } from './User';
import { UserTheme } from './UserTheme';

const sequelizeOptions: SequelizeOptions = {
  host: dbConfig.HOST,
  port: Number(dbConfig.PORT),
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: Record<string, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.addModels([Message, Question, Section, User, SiteTheme, UserTheme]);

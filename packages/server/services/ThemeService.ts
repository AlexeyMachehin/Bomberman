/* eslint-disable @typescript-eslint/no-unused-vars */
import { SiteTheme } from '../models/SiteTheme';
import type { BaseRESTService } from './BaseRESTService';

interface FindRequest {
  id?: number; // ID темы в таблице
  title?: string; // Поиск по частичному совпадению в таблице
}

interface CreateRequest {
  title: string;
  description: string;
}

export class ThemeService implements BaseRESTService {
  public find = ({ id, title }: FindRequest) => {
    if (id) {
      return SiteTheme.findByPk(id);
    }
    return SiteTheme.findOne({
      where: {
        theme: `%${title}%`, // Защита от SQL Injection присутствует
      },
    });
  };
  public create = (data: CreateRequest) => {
    return SiteTheme.create({ ...data });
  };
}

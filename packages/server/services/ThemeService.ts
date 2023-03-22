/* eslint-disable @typescript-eslint/no-unused-vars */
import { SiteTheme } from '../models/SiteTheme';
import { UserTheme } from '../models/UserTheme';

class ThemeService {
  public getUserTheme = async (payload: { userId?: number }) => {
    if (!payload.userId) return null;
    const userTheme = await UserTheme.findOne({
      where: {
        ownerId: payload.userId,
      },
    });
    if (!userTheme) return null;
    const result = await SiteTheme.findByPk(userTheme.themeId);
    return result;
  };

  public findSiteTheme = async (title: string) => {
    const siteTheme = await SiteTheme.findOne({
      where: {
        title: title, // Защита от SQL Injection присутствует
      },
    });

    return siteTheme;
  };

  public createSiteTheme = async (title: string) => {
    const result = SiteTheme.create({ title });
    return result;
  };

  public setUserTheme = async (payload: {
    userId?: number;
    newTheme: string;
  }) => {
    const { userId, newTheme } = payload;

    if (!userId) {
      const theme = await this.findSiteTheme(newTheme);
      if (!theme) {
        const result = await this.createSiteTheme(newTheme);
        return result;
      } else {
        return theme;
      }
    } else {
      const oldUserTheme = await this.getUserTheme({ userId });
      let siteTheme = await this.findSiteTheme(newTheme);
      if (!siteTheme) siteTheme = await this.createSiteTheme(newTheme);
      if (!oldUserTheme) {
        const result = await UserTheme.create({
          ownerId: userId,
          themeId: siteTheme.id,
        });
        return result;
      } else {
        const result = await UserTheme.update(
          {
            themeId: siteTheme.id,
          },
          {
            where: {
              ownerId: userId,
            },
          }
        );
        return result;
      }
    }
  };
}

export default new ThemeService();

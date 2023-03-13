import { IMyProfile } from '../generalProfile/IMyProfile';
export type IPlayerProfile = IMyProfile & {
  timeToDead: number;
  kills: number;
  damage: number;
};

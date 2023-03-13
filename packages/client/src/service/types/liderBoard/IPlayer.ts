export interface IPlayer {
  name: string;
  score: number;
  avatarURL: string;
  id: number;
}

export interface IPlayerPayload {
  data: { data: IPlayer }[];
}

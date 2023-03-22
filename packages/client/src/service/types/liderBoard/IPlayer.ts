export interface IPlayer {
  displayName: string | null;
  score: number;
  avatarURL: string | null;
  id: number;
}

export interface IPlayerPayload {
  data: { data: IPlayer }[];
}

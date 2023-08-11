export type RemoteSourceResponse<T = any> = {
  ok: boolean;
  message: string;
  data?: T;
};

export type UpdateResult <T = any> = {
  old: T,
  data: T
}
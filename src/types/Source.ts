export type RemoteSourceResponse<T = any> = {
  ok: boolean;
  message: string;
  data?: T;
};

export type AppState<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
  isSuccess: boolean;
  hasError: boolean;
};

export class TaskState<T> {
  static loading<T>(): AppState<T> {
    return {
      loading: true,
      isSuccess: false,
      hasError: false,
    };
  }

  static success<T>(payload: T): AppState<T> {
    return {
      loading: false,
      isSuccess: true,
      hasError: false,
      data: payload,
    };
  }

  static error<T>(error: Error): AppState<T> {
    return {
      loading: false,
      isSuccess: false,
      hasError: true,
      error,
    };
  }
}

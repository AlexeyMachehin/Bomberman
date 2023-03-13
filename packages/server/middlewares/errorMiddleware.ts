import { ApiError } from '../exceptions/ApiError';
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function errorMiddleware(err: any, _req: any, res: any, _next: any) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}

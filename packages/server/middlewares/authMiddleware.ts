import { ApiError } from '../exceptions/ApiError';

export function authMiddleware(req: any, _res: any, next: any) {
  if (req.headers.cookie) {
    fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
      .then(res => {
        if (res.ok) {
          res
            .json()
            .then(user => {
              _res.locals.user = user;
              next();
            })
            .catch(next);
        } else {
          next();
        }
      })
      .catch(next);
  } else {
    return next(ApiError.UnauthorizedError());
  }
}

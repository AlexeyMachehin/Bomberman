import { ApiError } from '../exceptions/ApiError';
import type { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (req, _res, next) => {
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
};

import {
  createProxyMiddleware,
  responseInterceptor,
  RequestHandler,
  fixRequestBody,
} from 'http-proxy-middleware';

import { User } from '../models/User';

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  return createProxyMiddleware({
    target: 'https://ya-praktikum.tech/api/v2',
    pathRewrite: { '^/bomberapi': '' },
    changeOrigin: true,
    cookieDomainRewrite: req.hostname,
    selfHandleResponse: true,
    logLevel: 'debug',
    cookiePathRewrite: '/',
    onProxyReq: fixRequestBody,
    onProxyRes: responseInterceptor(
      async (responseBuffer, _proxyRes, _req, _res) => {
        const sc = _proxyRes.headers['set-cookie'];
        if (Array.isArray(sc)) {
          _proxyRes.headers['set-cookie'] = sc.map(sc => {
            return sc.replace('Path=/', 'Path=/bomberapi/auth');
          });
        }

        if (req.url.includes('/auth/user') && req.method === 'GET') {
          const response = responseBuffer.toString(); // convert buffer to string
          let user;
          try {
            user = JSON.parse(response);
          } catch (e) {
            user = null;
          }
          if (user && user.id) {
            try {
              await User.upsert({
                id: user.id,
                name: user.display_name,
                avatarurl: user.avatar,
              });
            } catch (e) {
              console.error(e);
            }
          }
        }
        return responseBuffer;
      }
    ),
  })(req, res, next);
};

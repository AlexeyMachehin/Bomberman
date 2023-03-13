import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { db } from './models';
import { router } from './routes/index';
import { errorMiddleware } from './middlewares/errorMiddleware';
import * as fs from 'fs';
import * as path from 'path';

const PORT = Number(process.env.SERVER_PORT) || 3001;
const app = express();

app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use('/bomberapi', router);
app.use(errorMiddleware);

db.sequelize.sync();

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
  const srcPath = path.dirname(require.resolve('client'));

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  app.use('/assets', express.static(path.resolve(distPath, 'assets')));

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );

        console.log(template);

        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      }

      let render: ({
        store,
        path,
      }: {
        store: any;
        path: string;
      }) => Promise<string>;
      let createStore: () => any;

      if (!isDev) {
        render = (await import(ssrClientPath)).render;
        createStore = (await import(ssrClientPath)).createStoreForSSR;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
        createStore = (
          await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
        ).createStoreForSSR;
      }

      const store = createStore();

      const appHtml = await render({ store, path: url });

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();

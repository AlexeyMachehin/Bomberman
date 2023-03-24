import cors from 'cors';

export const corsMiddleware = () => {
  const clientPort = Number(process.env.CLIENT_PORT) || 3000;
  const corsOptions = {
    credentials: true,
    origin: [
      `http://127.0.0.1:${clientPort}`,
      `http://localhost:${clientPort}`,
      `http://158.160.60.43`,
    ],
    optionsSuccessStatus: 200,
  };

  return cors(corsOptions);
};

import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello from server helpppp');
});

const port: number = 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

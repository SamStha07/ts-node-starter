import 'module-alias/register';
import express, { Request, Response } from 'express';
import add from '@math/math';

const app = express();

console.log(add(5, 90));

app.get('/', (req: Request, res: Response) => {
  res.send('hello from server asdasdas');
});

const port = 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

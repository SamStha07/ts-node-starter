import 'module-alias/register';
import app from '@lib/app';

const PORT = process.env.PORT || 8000;

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!, SHUTTING DOWN....');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION!, SHUTTING DOWN....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

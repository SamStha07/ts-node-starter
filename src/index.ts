import 'module-alias/register';
import cloudinary from 'cloudinary';
import app from '@lib/app';

const PORT = process.env.PORT || 8000;

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!, SHUTTING DOWN....');
  console.log(err.name, err.message);
  process.exit(1);
});

cloudinary.v2.config({
  cloud_name: 'coderportal',
  api_key: '189533717964219',
  api_secret: 'QvVaK5S7kyLEDKSWYzTo6yd3qpA',
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

const express = require('express');
const AppError = require('./utils/appError');

const globalErrorHandler = require('./middlewares/errorHandler');

const userRouter = require('./routes/userRoutes');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the server side!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

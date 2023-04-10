const express = require('express');
const loginRouter = require('./router/Login.router');
const userRouter = require('./router/User.router');
const categoryRouter = require('./router/Category.router');
const postRouter = require('./router/Post.router');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

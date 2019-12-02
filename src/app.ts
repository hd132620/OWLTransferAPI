import express from 'express';

const app = express();

app.use(require('./router'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

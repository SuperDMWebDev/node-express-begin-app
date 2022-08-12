const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');
const router = require('./routes/products');
require('dotenv').config();
//middleware
app.use(express.json());
//routes

app.get('/', (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">products route</a>`);
});

//products routes
app.use('/api/v1/products', router);
app.use(notFoundMiddleware);
app.use(errorMiddleWare);

const port = process.env.port || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`App is running at http://localhost:${port}`));
  } catch (err) {
    console.log('err', err);
  }
};
start();

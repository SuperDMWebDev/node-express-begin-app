const connectDB = require('./db/db');
const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
//middleware
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
  res.send('Task manager app');
});

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (e) {
    console.log(e);
  }
};
start();

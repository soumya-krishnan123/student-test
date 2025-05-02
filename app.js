const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const studentRoutes=require('./routes/studentRoutes')
const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/student',studentRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

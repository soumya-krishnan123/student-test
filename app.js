const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const studentRoutes=require('./src/routes/studentRoutes')
const app = express();
const cors=require('cors')
connectDB();

app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/student',studentRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

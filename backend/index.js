const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config file imports
const cloudinaryConfig = require('./configuration/cloudinary.config');
const database = require('./configuration/database.config');

// Importing the routes
const UserRoute = require('./routes/auth.route');
const checkListRoute = require('./routes/checklist.route');

// Connecting to database and cloudinary
database();
cloudinaryConfig();

// Setting up the routes
app.use('/api/v1/auth', UserRoute);
app.use('/api/v1/checklist',checkListRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
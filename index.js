const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');

// Create an Express app
const app = express();
const PORT = 3000;

// Configuration for MySQL connection
const DataConnectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myfoodcom',
};

// Create a connection to the MySQL database
const con = mysql.createConnection(DataConnectionConfig);

// Connect to the database
con.connect(function (error) {
  if (error) {
    console.error('Connection failed:', error);
    process.exit(1); // Terminate the application if connection fails
  } else {
    console.log('Connection successful');
  }
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// API endpoint to handle comment submissions
app.post('/api/myfoodcom', upload.single('photo'), (req, res) => {
  const { comment, location, selectedCookingDay, cookingTime } = req.body;
  const photo = req.file ? req.file.filename : null;

  // Check if the comment field is empty
  if (!comment) {
    console.error('Comment field cannot be empty');
    // Respond with an error message
    res.status(400).json({ error: 'Comment field cannot be empty' });
    return; // Exit the function early
  }

  // Insert the comment into the database
  const query =
    'INSERT INTO `userinputer`(`comment`, `photo`, `location`, `selectedCookingDay`, `cookingTime`) VALUES (?, ?, ?, ?, ?)';
  con.query(
    query,
    [comment, photo, location, selectedCookingDay, cookingTime],
    (error, results, fields) => {
      if (error) {
        console.error('Error adding comment:', error);
        // Respond with an error message
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Comment added successfully');
        // Respond with a success message
        res.status(200).json({ message: 'Comment added successfully' });
      }
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

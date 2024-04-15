const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Adjust the origin URL as per your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '', 
  database: 'nar\'s' 
});

// Route to handle user signin
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const sql = `SELECT * FROM admin WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during signin' });
      }

      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Set session and cookie for user
      req.session.user = result[0];
      res.cookie('user', result[0].username, { maxAge: 900000, httpOnly: true });
      
      return res.status(200).json({ success: true, message: 'Signin successful', username: result[0].username });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'An error occurred during signin' });
  }
});

// Route to handle pin validation
app.post('/validate-pin', async (req, res) => {
  const { pin } = req.body;

  try {
    if (pin === '12345') { // Check if the pin is correct (replace with actual pin validation logic)
      return res.status(200).json({ success: true, message: 'Pin validated successfully' });
    } else {
      return res.status(401).json({ error: 'Invalid pin' });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'An error occurred during pin validation' });
  }
});

// Add this route to fetch sales report data
app.get('/sales-report', async (req, res) => {
  try {
    // Query the database to fetch sales report data
    const sql = `SELECT * FROM user_login`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching sales report data' });
      }

      // Send the fetched data as JSON response
      return res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'An error occurred while fetching sales report data' });
  }
});


// Route to handle user logout
app.get('/logout', (req, res) => {
    // Clear session and cookies for user
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during logout' });
      }
      res.clearCookie('user');
      return res.status(200).json({ success: true, message: 'Logout successful' });
    });
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

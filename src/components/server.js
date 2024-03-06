// server.js
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Zaqwer1234',
  database: 'product',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to get all products
app.get('/getProducts', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching product data:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      res.json({ success: true, products: results });
    }
  });
});

// Endpoint to add a new product
app.post('/addProduct', (req, res) => {
  const { pID, pName, price, pCategory, pImage } = req.body;

  const query = 'INSERT INTO products (pID, pName, price, pCategory, pImage) VALUES (?, ?, ?, ?, ?)';
  db.execute(query, [pID, pName, price, pCategory, pImage], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Failed to add product' });
    } else {
      res.json({ success: true, message: 'Product added successfully' });
    }
  });
});

// Endpoint to delete a product
app.delete('/deleteProduct/:pID', (req, res) => {
  const productId = req.params.pID;

  // Check if the product with the given ID exists before attempting to delete
  const checkQuery = 'SELECT * FROM products WHERE pID = ?';
  db.query(checkQuery, [productId], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking product existence:', checkErr);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else if (checkResults.length === 0) {
      res.status(404).json({ success: false, error: 'Product not found' });
    } else {
      // Delete the product with the given ID
      const deleteQuery = 'DELETE FROM products WHERE pID = ?';
      db.execute(deleteQuery, [productId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting product:', deleteErr);
          res.status(500).json({ success: false, message: 'Failed to delete product' });
        } else {
          res.json({ success: true, message: 'Product deleted successfully' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

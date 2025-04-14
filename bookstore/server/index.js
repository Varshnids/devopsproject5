const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store (replace with a database in production)
let books = [
  // Featured Books
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 24.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    category: 'Fiction',
  },
  // Add more books...
];

let users = [];
let cart = new Map();

// API Routes
// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Add to cart
app.post('/api/cart/add', (req, res) => {
  const { userId, bookId, quantity = 1 } = req.body;
  if (!cart.has(userId)) {
    cart.set(userId, new Map());
  }
  const userCart = cart.get(userId);
  userCart.set(bookId, (userCart.get(bookId) || 0) + quantity);
  res.json({ message: 'Added to cart' });
});

// Get cart
app.get('/api/cart/:userId', (req, res) => {
  const userCart = cart.get(req.params.userId);
  if (!userCart) return res.json([]);
  
  const cartItems = [];
  for (const [bookId, quantity] of userCart.entries()) {
    const book = books.find(b => b.id === parseInt(bookId));
    if (book) {
      cartItems.push({ ...book, quantity });
    }
  }
  res.json(cartItems);
});

// User registration
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: users.length + 1, email, password, name };
  users.push(newUser);
  res.status(201).json({ message: 'User created', userId: newUser.id });
});

// User login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ userId: user.id, name: user.name });
});

// Student discount verification
app.post('/api/student-verification', (req, res) => {
  const { studentId, email } = req.body;
  // In a real application, verify student status with a student verification service
  const isValid = email.endsWith('.edu');
  res.json({ isValid, discountCode: isValid ? 'STUDENT15' : null });
});

// Search books
app.get('/api/books/search', (req, res) => {
  const { query } = req.query;
  if (!query) return res.json(books);
  
  const searchResults = books.filter(book => 
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase()) ||
    book.category.toLowerCase().includes(query.toLowerCase())
  );
  res.json(searchResults);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
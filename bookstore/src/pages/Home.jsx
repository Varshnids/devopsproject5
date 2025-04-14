import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Paper,
  Divider,
  Stack,
  IconButton,
  useTheme,
  Chip,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  MenuBook as BookIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  ArrowForward as ArrowForwardIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const carouselBooks = [
  {
    id: 'special1',
    title: 'Summer Reading Special',
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090',
    description: 'Get 20% off on all summer reading collection',
  },
  {
    id: 'special2',
    title: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    description: 'Check out our latest collection of bestsellers',
  },
  {
    id: 'special3',
    title: 'Children\'s Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    description: 'Explore our magical world of children\'s books',
  },
];

const categories = [
  { id: 1, name: 'Fiction', count: 156 },
  { id: 2, name: 'Non-Fiction', count: 142 },
  { id: 3, name: 'Science Fiction', count: 98 },
  { id: 4, name: 'Mystery', count: 87 },
  { id: 5, name: 'Romance', count: 112 },
  { id: 6, name: 'Biography', count: 76 },
  { id: 8, name: 'History', count: 65 },
  { id: 9, name: 'Self-Help', count: 92 },
];

const featuredBooks = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
    category: 'Fiction',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    category: 'Self-Help',
  },
  {
    id: 3,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 449,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546521343-4eb2c9aa8454',
    category: 'Science Fiction',
  },
  {
    id: 4,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 349,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1554774853-719586f82d77',
    category: 'Finance',
  }
];

const newReleases = [
  {
    id: 5,
    title: 'Iron Flame',
    author: 'Rebecca Yarros',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    category: 'Fantasy',
    isNew: true,
  },
  {
    id: 6,
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    price: 549,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646',
    category: 'Fantasy',
    isNew: true,
  },
  {
    id: 7,
    title: 'The Woman in Me',
    author: 'Britney Spears',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    category: 'Biography',
    isNew: true,
  },
  {
    id: 8,
    title: 'The Creative Act',
    author: 'Rick Rubin',
    price: 549,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
    category: 'Art',
    isNew: true,
  }
];

const bestSellers = [
  {
    id: 9,
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    price: 449,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    category: 'Literary Fiction',
    sales: 50000,
  },
  {
    id: 10,
    title: 'Lessons in Chemistry',
    author: 'Bonnie Garmus',
    price: 499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d',
    category: 'Historical Fiction',
    sales: 45000,
  },
  {
    id: 11,
    title: 'The Light We Carry',
    author: 'Michelle Obama',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    category: 'Memoir',
    sales: 60000,
  },
  {
    id: 12,
    title: 'Demon Copperhead',
    author: 'Barbara Kingsolver',
    price: 499,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe',
    category: 'Literary Fiction',
    sales: 40000,
  }
];

const Home = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddToCart = (book) => {
    addToCart(book);
    setSnackbar({
      open: true,
      message: `${book.title} added to cart!`,
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          py: 8,
          mb: 6,
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Welcome to Our Bookstore
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4 }}
          >
            Discover your next favorite book
          </Typography>
          <Box
            sx={{
              maxWidth: 600,
              mx: 'auto',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {[
            { icon: <ShippingIcon />, title: 'Free Shipping', desc: 'On orders over ₹1000' },
            { icon: <SecurityIcon />, title: 'Secure Payments', desc: '100% secure checkout' },
            { icon: <SupportIcon />, title: '24/7 Support', desc: 'Always here to help' },
            { icon: <BookIcon />, title: 'Easy Returns', desc: '30-day return policy' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  height: '100%',
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    mb: 2,
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {feature.icon}
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Books Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Books
        </Typography>
        <Grid container spacing={4}>
          {featuredBooks.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={book.image}
                  alt={book.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Rating value={book.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                    ₹{book.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(book)}
                    startIcon={<CartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Releases Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            New Releases
          </Typography>
          <Grid container spacing={4}>
            {newReleases.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={book.image}
                      alt={book.title}
                    />
                    <Chip
                      label="New Release"
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      by {book.author}
                    </Typography>
                    <Rating value={book.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                      ₹{book.price.toFixed(2)}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart(book)}
                      startIcon={<CartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Best Sellers Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Best Sellers
        </Typography>
        <Grid container spacing={4}>
          {bestSellers.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={book.image}
                    alt={book.title}
                  />
                  <Chip
                    icon={<OfferIcon />}
                    label="Best Seller"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Rating value={book.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                    ₹{book.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(book)}
                    startIcon={<CartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offers Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Summer Sale
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Get 30% off on all fiction books
                </Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  Shop Now
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Student Discount
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  15% off with valid student ID
                </Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Subscribe to our newsletter for new releases and exclusive offers
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '100%',
                maxWidth: '300px',
              }}
            />
            <Button variant="contained" sx={{ px: 4 }}>
              Subscribe
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Add Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 
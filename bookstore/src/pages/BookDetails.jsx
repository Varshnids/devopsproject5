import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(4.5);

  // This would typically come from an API call using the id
  const book = {
    title: 'Sample Book Title',
    author: 'Author Name',
    price: 399,
    description: 'This is a detailed description of the book. It would contain information about the plot, characters, and other relevant details that would help the reader understand what the book is about.',
    coverImage: 'https://via.placeholder.com/400x600',
    categories: ['Fiction', 'Adventure', 'Mystery'],
    isbn: '978-3-16-148410-0',
    publisher: 'Sample Publisher',
    publishDate: '2023-01-01',
    pages: 342,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating} / 5)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            ₹{book.price.toFixed(2)}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              size="large"
              sx={{ mr: 2 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              startIcon={<Favorite />}
              size="large"
            >
              Add to Wishlist
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {book.categories.map((category) => (
                <Chip key={category} label={category} />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Publisher: {book.publisher}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Publication Date: {book.publishDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pages: {book.pages}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetails; 
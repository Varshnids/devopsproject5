import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              Your wishlist is empty
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {wishlistItems.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'all 0.3s ease',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt={book.title}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${book.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {book.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(book)}
                  fullWidth
                >
                  Add to Cart
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromWishlist(book.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist; 
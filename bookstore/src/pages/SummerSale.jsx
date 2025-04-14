import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const saleBooks = [
  {
    id: 1,
    title: "Beach Read",
    author: "Emily Henry",
    price: 499,
    salePrice: 299,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "A romance writer and a literary writer swap genres for the summer.",
  },
  {
    id: 2,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 549,
    salePrice: 349,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    description: "An aging Hollywood starlet reveals her life story to an unknown journalist.",
  },
  {
    id: 3,
    title: "Summer of '69",
    author: "Elin Hilderbrand",
    price: 599,
    salePrice: 399,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1612969308146-066d55f37168",
    description: "Four siblings experience the summer of 1969 in Nantucket.",
  },
  {
    id: 4,
    title: "The Summer Place",
    author: "Jennifer Weiner",
    price: 499,
    salePrice: 299,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    description: "A family reunion at Cape Cod leads to unexpected revelations.",
  },
];

const SummerSale = () => {
  const { addToCart } = useCart();

  const calculateDiscount = (original, sale) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const handleAddToCart = (book) => {
    const cartItem = {
      id: book.id,
      bookId: book.id,
      title: book.title,
      price: book.salePrice || book.price,
      image: book.image,
      author: book.author
    };
    addToCart(cartItem);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 4,
          borderRadius: 2,
          mb: 6,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Summer Sale
        </Typography>
        <Typography variant="h5">
          Up to 40% off on selected summer reads!
        </Typography>
      </Box>

      {/* Books Grid */}
      <Grid container spacing={4}>
        {saleBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 6,
                },
              }}
            >
              <Chip
                label={`${calculateDiscount(book.price, book.salePrice)}% OFF`}
                color="error"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 1,
                }}
              />
              <CardMedia
                component="img"
                height="200"
                image={book.image}
                alt={book.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={book.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({book.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {book.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h6"
                    color="error"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ₹{book.salePrice}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ₹{book.price}
                  </Typography>
                </Box>
              </CardContent>
              <Button
                variant="contained"
                startIcon={<CartIcon />}
                onClick={() => handleAddToCart(book)}
                sx={{ m: 2 }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SummerSale; 
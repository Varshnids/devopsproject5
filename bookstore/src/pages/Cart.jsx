import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const cartItems = cart.items;

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(bookId, newQuantity);
  };

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Book</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.bookId}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{ width: 60, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              by {item.author}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.bookId, item.quantity - 1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.bookId, item.quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.bookId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle1">Total:</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">₹{calculateTotal().toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Subtotal</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">₹{calculateTotal().toFixed(2)}</Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography variant="subtitle1">Shipping</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">Free</Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">₹{calculateTotal().toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart; 
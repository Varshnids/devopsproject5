import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/orders/latest/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Unable to load order details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/orders')}
            sx={{ mt: 2 }}
          >
            View All Orders
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your order has been successfully placed and will be processed shortly.
          </Typography>
        </Box>

        {orderDetails && (
          <>
            <Divider sx={{ my: 4 }} />
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Order Number"
                      secondary={orderDetails.orderId}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Order Date"
                      secondary={new Date(orderDetails.orderDate).toLocaleDateString()}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Payment Method"
                      secondary={orderDetails.paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Shipping Address"
                      secondary={`${orderDetails.shippingAddress.street}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zipCode}`}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List>
                  {orderDetails.items.map((item) => (
                    <ListItem key={item.bookId} disablePadding>
                      <ListItemText
                        primary={item.title}
                        secondary={`Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${orderDetails.total.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                What's Next?
              </Typography>
              <Typography variant="body1" paragraph>
                1. You will receive an order confirmation email shortly.
              </Typography>
              <Typography variant="body1" paragraph>
                2. Once your order is shipped, we'll send you tracking information.
              </Typography>
              <Typography variant="body1" paragraph>
                3. Expected delivery: 3-5 business days.
              </Typography>
            </Box>
          </>
        )}

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/orders')}
          >
            View All Orders
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  FormControl,
  FormLabel,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping', 'Payment', 'Review'];

const Payment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderSummary, setOrderSummary] = useState(null);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  const fetchOrderSummary = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      const total = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setOrderSummary({ items: data, total });
    } catch (error) {
      console.error('Error fetching order summary:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.expDate.trim()) {
      newErrors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expDate)) {
      newErrors.expDate = 'Invalid expiration date (MM/YY)';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          paymentMethod,
          paymentDetails: {
            cardName: formData.cardName,
            cardNumber: formData.cardNumber,
            expDate: formData.expDate,
            billingAddress: formData.billingAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          items: orderSummary.items,
          total: orderSummary.total,
        }),
      });

      if (response.ok) {
        navigate('/order-confirmation');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrors({ submit: 'Payment processing failed. Please try again.' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Select a payment method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit / Debit Card"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                  disabled
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'credit' && (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name on card"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      error={!!errors.cardName}
                      helperText={errors.cardName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Expiration date (MM/YY)"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleInputChange}
                      error={!!errors.expDate}
                      helperText={errors.expDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Billing address"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      error={!!errors.billingAddress}
                      helperText={errors.billingAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={!!errors.state}
                      helperText={errors.state}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ZIP code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={!!errors.zipCode}
                      helperText={errors.zipCode}
                    />
                  </Grid>
                </Grid>

                {errors.submit && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {errors.submit}
                  </Alert>
                )}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/cart')}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Place Order
                  </Button>
                </Box>
              </form>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {orderSummary && (
              <>
                <Box sx={{ my: 2 }}>
                  {orderSummary.items.map((item) => (
                    <Box
                      key={item.bookId}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {item.title} x {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1">
                    ₹{orderSummary.total.toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment; 
import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';

const steps = ['Shipping address', 'Payment details', 'Review order'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const AddressForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zipCode"
          name="zipCode"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Use this address for payment details"
        />
      </Grid>
    </Grid>
  );

  const PaymentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="cardName"
          label="Name on card"
          fullWidth
          autoComplete="cc-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="cardNumber"
          label="Card number"
          fullWidth
          autoComplete="cc-number"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="expDate"
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
        />
      </Grid>
    </Grid>
  );

  const ReviewOrder = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {/* Add order summary details here */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">
        Total: $99.99
      </Typography>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ReviewOrder />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </Box>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout; 
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const contactInfo = [
  {
    icon: <Phone fontSize="large" />,
    title: 'Phone',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: <Email fontSize="large" />,
    title: 'Email',
    details: ['support@bookstore.com', 'info@bookstore.com'],
  },
  {
    icon: <LocationOn fontSize="large" />,
    title: 'Address',
    details: ['123 Book Street', 'Literary Lane, Reading City', 'RC 12345'],
  },
  {
    icon: <AccessTime fontSize="large" />,
    title: 'Working Hours',
    details: ['Monday - Friday: 9:00 AM - 8:00 PM', 'Saturday - Sunday: 10:00 AM - 6:00 PM'],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Thank you for your message. We will get back to you soon!',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          We'd Love to Hear From You
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Have a question about a book? Need help with your order? Or just want to share your
          thoughts? We're here to help!
        </Typography>
      </Box>

      {/* Contact Information Cards */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {contactInfo.map((info, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {info.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {info.title}
                </Typography>
                {info.details.map((detail, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    {detail}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Form */}
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          p: 4,
          boxShadow: 6,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Send Us a Message
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Map Section */}
      <Box sx={{ mt: 8, height: 400, bgcolor: 'grey.200', borderRadius: 2 }}>
        {/* Add your map component here */}
        <Typography variant="body1" align="center" sx={{ pt: 8 }}>
          Map will be displayed here
        </Typography>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 
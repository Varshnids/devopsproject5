import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckIcon,
  Assignment as AssignmentIcon,
  LocalLibrary as LibraryIcon,
  CardMembership as MembershipIcon,
} from '@mui/icons-material';

const StudentDiscount = () => {
  const theme = useTheme();

  const benefits = [
    {
      title: '15% Off All Books',
      description: 'Get 15% discount on all book purchases, including new releases',
      icon: <LibraryIcon />,
    },
    {
      title: 'Free Shipping',
      description: 'Free shipping on orders over $25',
      icon: <CheckIcon />,
    },
    {
      title: 'Special Events',
      description: 'Access to student-only sales and events',
      icon: <MembershipIcon />,
    },
    {
      title: 'Study Guides',
      description: 'Additional 20% off on all study guides and academic materials',
      icon: <AssignmentIcon />,
    },
  ];

  const requirements = [
    'Valid student ID from an accredited institution',
    'Current enrollment proof',
    'Valid .edu email address',
    'Must be at least 16 years old',
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 4 }}>
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Student Discount Program
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Save more on your educational journey with our exclusive student offers
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<SchoolIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Apply Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                alt="Students studying"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Program Benefits
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Requirements Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Eligibility Requirements
          </Typography>
          <List>
            {requirements.map((requirement, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={requirement} />
                </ListItem>
                {index < requirements.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>

      {/* How to Apply Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h5" gutterBottom>
            How to Apply
          </Typography>
          <Typography paragraph>
            1. Click the "Apply Now" button above
          </Typography>
          <Typography paragraph>
            2. Fill out the student verification form
          </Typography>
          <Typography paragraph>
            3. Upload your student ID and current enrollment proof
          </Typography>
          <Typography paragraph>
            4. Receive your discount code within 24 hours
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Apply Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentDiscount; 
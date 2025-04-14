import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import {
  LocalLibrary,
  People,
  EmojiObjects,
  Favorite,
} from '@mui/icons-material';

const features = [
  {
    icon: <LocalLibrary fontSize="large" />,
    title: 'Vast Collection',
    description: 'Access to over 1 million books across all genres and categories.',
  },
  {
    icon: <People fontSize="large" />,
    title: 'Expert Staff',
    description: 'Knowledgeable team to help you find your perfect read.',
  },
  {
    icon: <EmojiObjects fontSize="large" />,
    title: 'Personalized Recommendations',
    description: 'Get book suggestions based on your reading preferences.',
  },
  {
    icon: <Favorite fontSize="large" />,
    title: 'Reader Community',
    description: 'Join our community of book lovers and share your passion.',
  },
];

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    description: 'Book enthusiast with 15 years of experience in the industry.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Head Librarian',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Literature expert specializing in classic and contemporary fiction.',
  },
  {
    name: 'Michael Chen',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    description: 'Ensuring a seamless online book shopping experience.',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" gutterBottom>
          About BookStore
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Your Premier Destination for Books
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Founded in 2020, BookStore has grown from a small online bookshop to one of the leading
          digital bookstores. Our mission is to make reading accessible to everyone and foster
          a community of passionate readers.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 8 }} />

      {/* Team Section */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={4}>
        {team.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={member.image}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mission Statement */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 4,
          mt: 8,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
          We believe in the power of books to inspire, educate, and transform lives.
          Our mission is to connect readers with the books they love and create a
          vibrant community where the joy of reading is shared and celebrated.
        </Typography>
      </Box>
    </Container>
  );
};

export default About; 
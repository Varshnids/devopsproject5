import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryBooks(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].name);
      }
    } catch (error) {
      setError('Error loading categories. Please try again later.');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryBooks = async (category) => {
    try {
      setBooksLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/books/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setCategoryBooks(data);
    } catch (error) {
      setError('Error loading books. Please try again later.');
      console.error('Error fetching category books:', error);
    } finally {
      setBooksLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={4}>
          {/* Categories List */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category.id}
                    button
                    selected={selectedCategory === category.name}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <ListItemText
                      primary={category.name}
                      secondary={`${category.count} books`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Category Books */}
          <Grid item xs={12} md={9}>
            {selectedCategory && (
              <>
                <Typography variant="h4" gutterBottom>
                  {selectedCategory}
                </Typography>
                <Divider sx={{ mb: 4 }} />
                {booksLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : categoryBooks.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    py: 8,
                    color: 'text.secondary'
                  }}>
                    <LibraryBooksIcon sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6">
                      No books found in this category
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {categoryBooks.map((book) => (
                      <Grid item key={book.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 6,
                            },
                          }}
                        >
                          <CardActionArea onClick={() => handleBookClick(book.id)}>
                            <Box
                              sx={{
                                height: 200,
                                backgroundImage: `url(${book.image || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: 'grey.100',
                              }}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="h3" noWrap>
                                {book.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                by {book.author}
                              </Typography>
                              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" color="primary.main">
                                  ${book.price.toFixed(2)}
                                </Typography>
                                <Chip
                                  label={`${book.rating} ★`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories; 
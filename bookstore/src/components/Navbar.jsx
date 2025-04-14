import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Container,
  useTheme,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  LocalOffer as OfferIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  Receipt as ReceiptIcon,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.items.length;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories', icon: <CategoryIcon /> },
    { label: 'Summer Sale', path: '/summer-sale', icon: <OfferIcon /> },
    { label: 'Student Discount', path: '/student-discount', icon: <SchoolIcon /> },
    { label: 'My Orders', path: '/orders', icon: <ReceiptIcon /> },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '.1rem',
            }}
          >
            BOOKSTORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    handleMenuClose();
                    navigate(item.path);
                  }}
                >
                  {item.icon && (
                    <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </Box>
                  )}
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '.1rem',
            }}
          >
            BOOKSTORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  my: 2,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.icon && (
                  <Box component="span" sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </Box>
                )}
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ color: 'text.primary' }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem disabled>
                    <Typography variant="body2">
                      Signed in as {user.name}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to="/orders">
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
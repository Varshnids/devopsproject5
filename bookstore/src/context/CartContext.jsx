import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.bookId === action.payload.bookId);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.bookId === action.payload.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return {
          ...state,
          items: updatedItems,
        };
      }
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems,
      };

    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.bookId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return {
        ...state,
        items: filteredItems,
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.bookId === action.payload.bookId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems,
      };

    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return {
        ...state,
        items: [],
      };

    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  const addToCart = async (book) => {
    try {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          bookId: book.id,
          title: book.title,
          price: book.salePrice || book.price,
          image: book.image,
          author: book.author,
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    try {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { bookId, quantity },
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
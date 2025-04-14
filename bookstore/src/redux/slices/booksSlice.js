import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      image: 'https://m.media-amazon.com/images/I/41vVQwQ+QJL._SY445_SX342_.jpg',
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 14.99,
      image: 'https://m.media-amazon.com/images/I/51IXWZzlgSL._SY445_SX342_.jpg',
      description: 'The story of racial injustice and the loss of innocence in the American South.',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 11.99,
      image: 'https://m.media-amazon.com/images/I/41aM4xOZxaL._SY445_SX342_.jpg',
      description: 'A dystopian social science fiction novel and cautionary tale.',
    },
  ],
  status: 'idle',
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer; 
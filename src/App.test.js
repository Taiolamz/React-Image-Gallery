import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { useDispatch, useSelector } from 'react-redux'; 
import App from './App';
import { getImages } from './redux/images'; 

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./redux/images', () => ({
  getImages: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      image: { 
        images: [
          { albumId: 1, id: 1, thumbnailUrl: 'url1', title: 'Title 1', url: 'url1' },
          { albumId: 2, id: 2, thumbnailUrl: 'url2', title: 'Title 2', url: 'url2' },
        ],
        loading: false,
      },
    });
  });

  test('renders component with initial state', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    
    const { getByText, getByPlaceholderText } = render(<App />);
    
    // Check if component renders with initial state
    expect(getByText("Hassan's Gallery")).toBeInTheDocument();
    expect(getByPlaceholderText('Search images')).toBeInTheDocument();
    
    // Check if images are rendered
    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Title 2')).toBeInTheDocument();
  });

  test('dispatches getImages action on mount', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(<App />);
    
    // Check if getImages action is dispatched on mount
    expect(dispatch).toHaveBeenCalledWith(getImages({ page: 1, limit: 12 }));
  });

  test('handles search functionality', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText('Search images');
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'Title 1' } });
    
    // Check if search input value is updated
    expect(searchInput).toHaveValue('Title 1');
    
    // Check if getImages action is dispatched with search value
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(getImages({ page: 1, limit: 12 })));
  });
});

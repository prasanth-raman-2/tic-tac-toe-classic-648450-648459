import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/tic tac toe/i);
  expect(titleElement).toBeInTheDocument();
});

test('starts with empty board', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  squares.slice(0, 9).forEach(square => {
    expect(square).toHaveTextContent('');
  });
});

test('alternates between X and O', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
  
  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent('O');
});

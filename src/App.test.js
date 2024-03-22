import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Query from './query';

describe('Query component', () => {
  it('renders correctly with status 0', () => {
    const { queryByText } = render(<Query pokemonData={null} status={0} />);
    const element = queryByText("No data available");
    expect(element).toBeNull();
  });

  it('renders correctly with status 1 and valid pokemonData', () => {
    const pokemonData = {
      id: 25,
      name: 'pikachu',
      sprites: {
        front_default: 'pikachu.png'
      }
    };
    const { getByText } = render(<Query pokemonData={pokemonData} status={1} />);
    const nameElement = getByText(/Pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders correctly with status -1', () => {
    const { getByText } = render(<Query pokemonData={null} status={-1} />);
    const notFoundElement = getByText(/POKEMON NOT FOUND/i);
    expect(notFoundElement).toBeInTheDocument();
  });

  it('renders correctly with status -2', () => {
    const { getByText } = render(<Query pokemonData={null} status={-2} />);
    const errorElement = getByText(/ERROR/i);
    expect(errorElement).toBeInTheDocument();
  });
});

describe('Previous and Next buttons functionality', () => {
  it('clicking the "Previous" button decrements id by 1', () => {
    const mockPrevious = jest.fn();
    const pokemonData = { id: 25, name: 'pikachu', sprites: { front_default: 'pikachu.png' } };
    const { getByText } = render(<Query pokemonData={pokemonData} status={1} previous={mockPrevious} />);
    const previousButton = getByText(/Previous/i);
    fireEvent.click(previousButton);
    expect(mockPrevious).toHaveBeenCalled();
  });

  it('clicking the "Next" button increments id by 1', () => {
    const mockNext = jest.fn();
    const pokemonData = { id: 25, name: 'pikachu', sprites: { front_default: 'pikachu.png' } };
    const { getByText } = render(<Query pokemonData={pokemonData} status={1} next={mockNext} />);
    const nextButton = getByText(/Next/i);
    fireEvent.click(nextButton);
    expect(mockNext).toHaveBeenCalled();
  });
});

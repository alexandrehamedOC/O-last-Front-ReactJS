//* Test de rendu de composant

import { render, screen, fireEvent } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import App from '../src/components/App/App';
import '@testing-library/jest-dom/extend-expect';

describe('render App', () => {
  it('should render App', () => {
    render(<App />);
    expect(screen.getByText("Bienvenue sur O'Last !")).toBeInTheDocument();
  });

  it('should render input', () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText('Chercher un jeu ...')
    ).toBeInTheDocument();
  });

  it('should render the start button', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: 'Start !' });
    expect(startButton).toBeInTheDocument();
  });

  it('should handle button click', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: 'Start !' });
    fireEvent.click(startButton);
    expect(startButton).toBeInTheDocument();
  });
});

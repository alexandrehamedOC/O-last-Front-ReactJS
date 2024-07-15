//* Test de rendu de composant

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/components/App/App';
import '@testing-library/jest-dom/extend-expect';

describe('render App', () => {
  it('should render App', () => {
    render(<App />);
    expect(screen.getByText("Bienvenue sur O'Last !")).toBeInTheDocument();
  });
});

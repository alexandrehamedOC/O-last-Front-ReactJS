import EditProfil from '../src/components/Profil/EditProfil/EditProfil';
import axios from 'axios';
import { queryByText, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { describe, it, beforeEach, expect, vi } from 'vitest';

// Mock la méthode de axios.get
vi.mock('axios');

describe('EditProfil component', () => {
  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    // document.querySelectorAll = () => ['node'];
    vi.clearAllMocks();
  });

  it('fetch profil details', async () => {
    // Données mockées pour la réponse de la requête axios.get
    const mockGames = [
      {
        id: 1,
        name: 'Test 1',
      },
    ];
    const mockProfil = [
      {
        id: 2,
        name: 'Test 2',
      },
    ];

    // Mock la réponse de la requête axios.get
    vi.mock('axios').mockResolvedValueOnce({ data: mockGames });
    vi.mock('axios').mockResolvedValueOnce({ data: mockProfil });

    // Rener the EditProfil component
    render(
      <Router>
        <Routes>
          <Route path="/edit-profil/:id" element={<EditProfil />} />
        </Routes>
      </Router>
    );

    // Vérifie que axios.get a été appelé avec la bonne URL
    // Assertions
    expect(axios.get).toHaveBeenCalledTimes(2); // Ensure axios.get was called twice
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL}/games/`
    );
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_BASE_URL}/profil/details/${mockProfil[0].id}`
    );
    await waitFor(async () => {
      await screen.findByText('Test 1'); // Exemple d'assertion pour la liste des jeux
      await screen.findByText('Test 2'); // Example assertion for profil details
    });
  });
});

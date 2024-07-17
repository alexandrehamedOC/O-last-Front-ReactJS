// import { beforeEach, describe, it } from 'vitest';
// import EditProfil from '../src/components/Profil/EditProfil/EditProfil'; // Assurez-vous que le chemin est correct
// import axios from 'axios';
// import * as reactRouterDom from 'react-router-dom';
// import sinon from 'sinon';
// import { render } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';

// describe('EditProfil component', () => {
//   let getStub: sinon.SinonStub;
//   let useParamsStub: sinon.SinonStub;

//   beforeEach(() => {
//     // Créez un stub pour axios.get
//     getStub = sinon.stub(axios, 'get');

//     // Créez un stub pour useParams
//     useParamsStub = sinon.stub(reactRouterDom, 'useParams');
//   });

//   afterEach(() => {
//     // Restaurez les stubs à leur comportement original après chaque test
//     getStub.restore();
//     if (useParamsStub) {
//       useParamsStub.restore();
//     }
//   });

//   it('fetches profil details correctly', async () => {
//     const mockProfil = { id: 1, name: 'John Doe' };
//     const mockGames = [
//       { id: 1, name: 'Game 1' },
//       { id: 2, name: 'Game 2' },
//     ];

//     // Configurez le stub pour retourner des promesses résolues avec des données mockées
//     getStub.onFirstCall().returns(Promise.resolve({ data: mockGames }));
//     getStub.onSecondCall().returns(Promise.resolve({ data: mockProfil }));

//     // Configurez le stub pour useParams
//     useParamsStub.returns({ id: 1 }); // Assurez-vous que '1' est un type acceptable pour 'id'

//     // Render the component
//     render(
//       <Router>
//         <EditProfil />
//       </Router>
//     );

//     // Assertions
//     sinon.assert.calledTwice(getStub); // Ensure axios.get was called twice
//     sinon.assert.calledWith(
//       getStub,
//       `${import.meta.env.VITE_API_BASE_URL}/games/`
//     );
//     sinon.assert.calledWith(
//       getStub,
//       `${import.meta.env.VITE_API_BASE_URL}/profil/details/1`
//     );
//     // Additional assertions for component rendering if needed
//   });
// });
/* import EditProfil from '../src/components/Profil/EditProfil/EditProfil';
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
 */

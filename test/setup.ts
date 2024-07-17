// src/setupTests.ts

// Import des matchers Jest-DOM
import '@testing-library/jest-dom/extend-expect';

// Import de vitest pour les assertions
import { expect } from 'vitest';

// Import des matchers Jest-DOM spécifiques
import * as matchers from '@testing-library/jest-dom';

// Étendre les matchers de vitest avec ceux de Jest-DOM
expect.extend(matchers);

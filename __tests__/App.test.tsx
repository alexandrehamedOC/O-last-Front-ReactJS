// import { render, screen } from '@testing-library/react';
// import { describe, it } from 'vitest';
// import React from 'react';
// import App from '../src/components/App/App';
// import { expect } from 'vitest';
// import '@testing-library/jest-dom/extend-expect';

// // import * as matchers from '@testing-library/jest-dom/matchers';
// // expect.extend(matchers);

// describe('render App', () => {
//   it('should render App', () => {
//     render(<App />);
//     expect(screen.getByText('Hello, world!')).toBeInTheDocument();
//   });
// });
// import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
// import React from 'react';
// import App from '../src/components/App/App';
// import '@testing-library/jest-dom/extend-expect';

// describe('render App', () => {
//   it('should render App', () => {
//     render(<App />);
//     expect(screen.getByText("Bienvenue sur O'Last !")).toBeInTheDocument();
//   });
// });
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

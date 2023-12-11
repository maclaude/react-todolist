import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Connexion } from './Connexion';

describe('<Connexion />', () => {
  test('render', () => {
    // WHEN
    render(<Connexion />, { wrapper: BrowserRouter });

    // THEN
    expect(screen.getByText(/Bienvenue !/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { Connexion } from './Connexion';

describe('<Connexion />', () => {
  test('render', () => {
    // WHEN
    render(<Connexion />, {
      wrapper: BrowserRouter,
    });

    // THEN
    expect(screen.getByText(/Bienvenue !/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Connectez vous pour pouvoir sauvegarder et consulter vos listes ✨/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });

  test('user click on signup button', async () => {
    // GIVEN
    const user = userEvent.setup();

    render(<Connexion />, {
      wrapper: BrowserRouter,
    });

    // WHEN
    await user.click(screen.getByText(/Inscription/i));

    // THEN
    expect(screen.getByText(/Inscription/i)).toHaveClass('active');
    expect(screen.getByText(/Inscription/i)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('user click on signin button', async () => {
    // GIVEN
    const user = userEvent.setup();

    render(<Connexion />, {
      wrapper: BrowserRouter,
    });

    // WHEN
    await user.click(screen.getByText(/Connexion/i));

    // THEN
    expect(screen.getByText(/Connexion/i)).toHaveClass('active');
    expect(screen.getByText(/Connexion/i)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

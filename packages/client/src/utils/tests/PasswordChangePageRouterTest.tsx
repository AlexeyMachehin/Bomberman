import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';
import { store } from '@/store/store';
import PasswordChange from '@/pages/passwordChange/PasswordChange';

test('Renders profile-change Page component when on /profile-change route', () => {
  render(
    <MemoryRouter initialEntries={[RoutePath.PROFILE_CHANGE]}>
      <Provider store={store}>
        <Routes>
          <Route
            path={RoutePath.PASSWORD_CHANGE}
            element={<PasswordChange />}
          />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByTestId('passwordChange-component')).toBeInTheDocument();
});

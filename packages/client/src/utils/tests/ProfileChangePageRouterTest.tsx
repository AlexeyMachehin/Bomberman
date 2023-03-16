import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';
import { store } from '@/store/store';
import ProfileChange from '@/pages/profileChange/ProfileChange';

test('Renders profile-change Page component when on /profile-change route', () => {
  render(
    <MemoryRouter initialEntries={[RoutePath.PROFILE_CHANGE]}>
      <Provider store={store}>
        <Routes>
          <Route path={RoutePath.PROFILE_CHANGE} element={<ProfileChange />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByTestId('profileChange-component')).toBeInTheDocument();
});

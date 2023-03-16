import Profile from '@/pages/profile/Profile';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';
import { store } from '@/store/store';

test('Renders ProfilePage component when on /profile route', () => {
  render(
    <MemoryRouter initialEntries={[RoutePath.PROFILE]}>
      <Provider store={store}>
        <Routes>
          <Route path={RoutePath.PROFILE} element={<Profile />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByTestId('profilePage-component')).toBeInTheDocument();
});

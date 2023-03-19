import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';
import PasswordChange from '@/pages/passwordChange/PasswordChange';

test('StartPage renders correctly', () => {
  const component = render(
    <MemoryRouter>
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
  expect(component).toMatchSnapshot();
});

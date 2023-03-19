import '../../../matchMedia.mock';
import Signup from '@/pages/Signup/Signup';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';

test('SignupPage renders correctly', () => {
  const component = render(
    <MemoryRouter>
      <Provider store={store}>
        <Routes>
          <Route path={RoutePath.SIGNUP} element={<Signup />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );
  expect(component).toMatchSnapshot();
});

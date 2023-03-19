import '../../../matchMedia.mock';
import StartPage from '@/pages/startPage/StartPage';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Route as RoutePath } from '@/const';

test('StartPage renders correctly', () => {
  const component = render(
    <MemoryRouter>
      <Provider store={store}>
        <Routes>
          <Route path={RoutePath.INDEX} element={<StartPage />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );
  expect(component).toMatchSnapshot();
});

import Loader from '@/features/loader/Loader';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

test('Loader renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <Loader />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

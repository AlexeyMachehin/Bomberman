import ErrorSnackbar from '@/features/alerts/ErrorSnackbar';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

test('ErrorSnackbar renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <ErrorSnackbar />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

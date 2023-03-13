import CountdownBackdrop from '@/features/countdownBackdrop/CountdownBackdrop';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

test('CountdownBackdrop component renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <CountdownBackdrop />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

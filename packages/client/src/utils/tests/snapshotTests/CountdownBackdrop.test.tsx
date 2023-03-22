import '../../../matchMedia.mock';
import CountdownBackdrop from '@/features/countdownBackdrop/CountdownBackdrop';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

test('CountdownBackdrop component renders correctly', () => {
  const fn = () => { console.log('test') };
  const component = render(
    <Provider store={store}>
      <CountdownBackdrop level={1} closeCb={fn} />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

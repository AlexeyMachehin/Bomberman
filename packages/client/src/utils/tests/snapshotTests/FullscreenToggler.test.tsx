import FullscreenToggler from '@/features/fullscreenToggler/FullscreenToggler';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

test('FullscreenToggler renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <FullscreenToggler elementId="" />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

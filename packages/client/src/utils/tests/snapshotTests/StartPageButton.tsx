import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { StartPageButton } from '@/features/startPageButton/StartPageButton';
import { MemoryRouter } from 'react-router-dom';

test('StartPageButton component renders correctly', () => {
  const component = render(
    <MemoryRouter>
      <Provider store={store}>
        <StartPageButton />
      </Provider>
    </MemoryRouter>
  );
  expect(component).toMatchSnapshot();
});

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Snackbar } from '@material-ui/core';

import { initialState } from '../testing/initialState';
import { App } from './App';
import { hideSnackbar } from '../store/settings/actions';

const mockStore = configureStore();

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe(`${App.name} - Компонент приложения:`, () => {
  it('рендерится без ошибок', () => {
    const wrapper = mount(wrappedComponent);
    expect(wrapper).toBeDefined();
  });

  if (React.StrictMode === null) {
    it('диспатч экшена hideSnackbar', () => {
      const wrapper = mount(wrappedComponent);
      wrapper.find(Snackbar).simulate('close');
      expect(store.dispatch).toHaveBeenCalledWith(hideSnackbar());
    });
  }
});

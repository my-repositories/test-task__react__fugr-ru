import React from 'react';
import { mount } from 'enzyme';
import { AppBar, IconButton } from '@material-ui/core';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initialState } from '../testing/initialState';
import { Header } from './Header';
import { toggleSidebar } from '../store/settings/actions';

const mockStore = configureStore();

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedComponent = (
  <Provider store={store}>
    <Header />
  </Provider>
);

describe(`${Header.name} - Компонент верхней панели:`, () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(wrappedComponent);
  });

  it('рендерит компонент AppBar', () => {
    expect(wrapper.find(AppBar).length).toBe(1);
  });

  it('диспатч экшена toggleSidebar при клике на IconButton', () => {
    wrapper.find(IconButton).simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { Drawer, IconButton } from '@material-ui/core';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Sidebar } from './Sidebar';
import { toggleSidebar } from '../store/settings/actions';
import { initialState } from '../testing/initialState';

const mockStore = configureStore();
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedComponent = (
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe(`${Sidebar.name} - Компонент боковой панели:`, () => {
  it('рендерит компонент Drawer', () => {
    const wrapper = mount(wrappedComponent);
    expect(wrapper.find(Drawer).length).toBe(1);
  });

  it('по умолчанию открыт', () => {
    const wrapper = mount(wrappedComponent);
    expect(wrapper.find(Drawer).prop('open')).toBe(true);
  });

  it('диспатч экшена toggleSidebar при клике на IconButton', () => {
    const wrapper = mount(wrappedComponent);
    wrapper.find(IconButton).simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });
});

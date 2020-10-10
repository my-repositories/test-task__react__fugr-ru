import React from 'react';
import { mount } from 'enzyme';
import { Drawer, IconButton } from '@material-ui/core';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Sidebar } from './Sidebar';
import { RootState } from '../store/rootReducer';
import { toggleSidebar } from '../store/settings/actions';

const mockStore = configureStore();
const initialState: RootState = {
  users: {
    isSmallSize: true,
    items: [],
    hasLoadingError: false,
    showSpinner: false,
    filter: '',
    selectedUser: null,
  },
  settings: {
    isSidebarOpened: true,
    snackbar: {
      text: '',
      vertical: 'top',
      horizontal: 'right',
      opened: false,
    },
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedSidebar = (
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe(`${Sidebar.name} - Компонент боковой панели:`, () => {
  it('рендерит компонент Drawer', () => {
    const wrapper = mount(wrappedSidebar);
    expect(wrapper.find(Drawer).length).toBe(1);
  });

  it('по умолчанию открыт', () => {
    const wrapper = mount(wrappedSidebar);
    expect(wrapper.find(Drawer).prop('open')).toBe(true);
  });

  it('диспатч экшена toggleSidebar при клике на IconButton', () => {
    const wrapper = mount(wrappedSidebar);
    wrapper.find(IconButton).simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });
});

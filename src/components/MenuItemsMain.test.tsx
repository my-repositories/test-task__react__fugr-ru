import React from 'react';
import { mount } from 'enzyme';
import { ListItem } from '@material-ui/core';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initialState } from '../testing/initialState';
import { MenuItemsMain } from './MenuItemsMain';
import { toggleUsersSize } from '../store/users/actions';

const mockStore = configureStore();

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedComponent = (
  <Provider store={store}>
    <MenuItemsMain />
  </Provider>
);

describe(`${MenuItemsMain.name} - Компонент с основным списком ссылок на боковой панели:`, () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(wrappedComponent);
  });

  it('рендерит два компонента ListItem', () => {
    expect(wrapper.find(ListItem).length).toBe(2);
  });

  it('первый ListItem заблокирован', () => {
    expect(wrapper.find(ListItem).at(0).prop('disabled')).toBe(true);
  });

  it('второй ListItem не заблокирован', () => {
    expect(wrapper.find(ListItem).at(1).prop('disabled')).toBe(false);
  });

  describe('Диспатч экшена toggleSize при клике:', () => {
    it('на первый ListItem', () => {
      wrapper.find(ListItem).at(0).simulate('click');
    });

    it('на второй ListItem', () => {
      wrapper.find(ListItem).at(1).simulate('click');
    });

    afterEach(() => {
      expect(store.dispatch).toHaveBeenCalledWith(toggleUsersSize());
    });
  });
});

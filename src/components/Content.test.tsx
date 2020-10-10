import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initialState } from '../testing/initialState';
import { loadUsers } from '../store/users/actions';
import { Content } from './Content';

const mockStore = configureStore();

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrappedComponent = (
  <Provider store={store}>
    <Content />
  </Provider>
);

describe(`${Content.name} - Компонент контентной области:`, () => {
  it('диспатч экшена loadUsers', () => {
    mount(wrappedComponent);
    expect(store.dispatch).toHaveBeenCalledWith(loadUsers(initialState.users.isSmallSize));
  });
});

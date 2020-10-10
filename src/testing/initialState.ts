import { RootState } from '../store/rootReducer';

export const initialState: RootState = {
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

import { RootState } from '../rootReducer';

export const getIsSidebarOpened: (state: RootState) => boolean = (state: RootState) => state.settings.isSidebarOpened;

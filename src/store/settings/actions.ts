import { action } from 'typesafe-actions';
import { TOGGLE_SIDEBAR } from './actionTypes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toggleSidebar = () => action(TOGGLE_SIDEBAR);

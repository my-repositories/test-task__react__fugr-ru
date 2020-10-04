import { SnackbarOrigin } from '@material-ui/core';

export interface SnackbarState extends SnackbarOrigin {
  opened: boolean;
  text: string;
}

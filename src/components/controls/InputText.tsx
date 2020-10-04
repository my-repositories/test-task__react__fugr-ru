import React from 'react';
import { TextField } from '@material-ui/core';

export const InputText = ({ input, label, meta: { touched, error }, ...custom }: any) => (
  <TextField label={label} helperText={touched && error} error={touched && !!error} {...input} {...custom} />
);

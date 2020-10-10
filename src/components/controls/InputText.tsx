import React from 'react';
import { TextField } from '@material-ui/core';

interface InputTextMeta {
  touched: boolean;
  error: string;
}

export interface InputTextProps {
  input: any;
  label: string;
  meta: InputTextMeta;
}

export const InputText = ({ input, label, meta: { touched, error }, ...custom }: InputTextProps) => (
  <TextField label={label} helperText={(touched && error) || ''} error={touched && !!error} {...input} {...custom} />
);

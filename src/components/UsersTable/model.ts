import React from 'react';
import { useStyles } from './styles';
import { User } from '../../store/users/user';

export type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof User;
  label: string;
  numeric: boolean;
}

export const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'firstName',
    numeric: true,
    label: 'FirstName',
  },
  {
    id: 'lastName',
    numeric: true,
    label: 'LastName',
  },
  {
    id: 'email',
    numeric: true,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: true,
    label: 'Phone',
  },
];

export interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

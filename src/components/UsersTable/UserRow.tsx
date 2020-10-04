import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { User } from '../../store/users/user';

interface UserRowProps {
  labelId: string;
  row: User;
  onClick: (user: User) => void;
}

export const UserRow: React.FC<UserRowProps> = ({ labelId, row, onClick }: UserRowProps) => (
  <TableRow hover tabIndex={-1} onClick={() => onClick(row)}>
    <TableCell component="th" id={labelId} scope="row">
      {row.id}
    </TableCell>
    <TableCell align="right">{row.firstName}</TableCell>
    <TableCell align="right">{row.lastName}</TableCell>
    <TableCell align="right">{row.email}</TableCell>
    <TableCell align="right">{row.phone}</TableCell>
  </TableRow>
);

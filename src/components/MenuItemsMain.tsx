import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSmallSize } from '../store/users/selectors';
import { toggleUsersSize } from '../store/users/actions';

export const MenuItemsMain: React.FC = () => {
  const isSmallSize = useSelector(getIsSmallSize);
  const dispatch = useDispatch();
  const toggleSize = () => dispatch(toggleUsersSize());

  return (
    <div>
      <ListItem button disabled={isSmallSize} onClick={toggleSize}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Маленький список" />
      </ListItem>
      <ListItem button disabled={!isSmallSize} onClick={toggleSize}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Большой список" />
      </ListItem>
    </div>
  );
};

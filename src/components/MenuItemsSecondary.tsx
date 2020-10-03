import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const MenuItemsSecondary: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <ListSubheader inset>Исходный код</ListSubheader>
      <a
        href="https://github.com/my-repositories/test-task__react__fugr-ru"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.menuItem}
      >
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Приложение" />
        </ListItem>
      </a>
      <a
        href="https://github.com/fugr-ru/frontend-javascript-test/blob/master/README.md"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.menuItem}
      >
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Текст задания" />
        </ListItem>
      </a>
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedUser } from '../../store/users/selectors';
import { selectUser } from '../../store/users/actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  textArea: {
    height: 90,
    width: 400,
  },
});

export const UsersDetails: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(getSelectedUser);
  const dispatch = useDispatch();
  const clearSelectedUser = () => dispatch(selectUser(null));

  if (!user) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Выбран пользователь{' '}
          <b>
            {user.firstName} {user.lastName}
          </b>
        </Typography>
        <Typography variant="body2" component="p">
          Описание:
        </Typography>
        <textarea defaultValue={user.description} className={classes.textArea} />
        <Typography variant="body2" component="p">
          Адрес проживания: <b>{user.address.streetAddress}</b>
        </Typography>
        <Typography variant="body2" component="p">
          Город: <b>{user.address.city}</b>
        </Typography>
        <Typography variant="body2" component="p">
          Провинция/штат: <b>{user.address.state}</b>
        </Typography>
        <Typography variant="body2" component="p">
          Индекс: <b>{user.address.zip}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={clearSelectedUser}>
          СБРОС
        </Button>
      </CardActions>
    </Card>
  );
};

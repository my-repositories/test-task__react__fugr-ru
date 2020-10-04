import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { InputText } from '../controls/InputText';
import { User } from '../../store/users/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mainTextFields = [
  { name: 'id', label: 'ID', focused: true },
  { name: 'firstName', label: 'FirstName' },
  { name: 'lastName', label: 'LastName' },
  { name: 'email', label: 'Email Address' },
  { name: 'phone', label: 'phone' },
  { name: 'description', label: 'Description' },
];

const addressTextFields = [
  { name: 'streetAddress', label: 'Street Address' },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'zip', label: 'Zip' },
];

function validate(user: User) {
  const errors: any = {};
  const requiredFields: Array<keyof User> = ['id', 'firstName', 'lastName', 'email', 'phone', 'description'];
  requiredFields.forEach((field: keyof User) => {
    if (!user[field]) {
      errors[field] = 'Required';
    }
  });

  if (user.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

export const UserAddForm: any = reduxForm({
  validate,
  form: 'UserAddForm',
})((props: any) => {
  const classes = useStyles();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.handleSubmit();
    props.reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Добавление пользователя
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {mainTextFields.map((input) => (
            <Field
              component={InputText}
              key={input.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={input.name}
              label={input.label}
              name={input.name}
              autoFocus={input.focused}
            />
          ))}
          <Typography variant="body2" color="textSecondary" align="center">
            Address
          </Typography>
          {addressTextFields.map((input) => (
            <Field
              component={InputText}
              key={input.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={input.name}
              label={input.label}
              name={`address.${input.name}`}
            />
          ))}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            disabled={props.invalid}
          >
            Добавить в таблицу
          </Button>
        </form>
      </div>
    </Container>
  );
});

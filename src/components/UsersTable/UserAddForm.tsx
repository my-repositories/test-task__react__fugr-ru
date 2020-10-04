import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/users/actions';

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

const initialFormState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  description: '',
  address: {
    streetAddress: '',
    city: '',
    zip: '',
    state: '',
  },
};

export const UserAddForm: React.FC = () => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState<any>(initialFormState);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addUser(formValue));
    setFormValue(initialFormState);
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const fields = name.split('.');

    setFormValue((prevState: any) => {
      const newState = {
        ...prevState,
        address: {
          ...prevState.address,
        },
      };
      let field: any = newState;

      for (let i = 0; i < fields.length; ++i) {
        if (i + 1 === fields.length) {
          field[fields[i]] = value;
        } else {
          field = field[fields[i]];
        }
      }

      return newState;
    });
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
        <form className={classes.form} noValidate>
          {mainTextFields.map((input) => (
            <TextField
              key={input.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={input.name}
              label={input.label}
              name={input.name}
              autoFocus={input.focused}
              value={formValue[input.name]}
              onChange={handleChange}
            />
          ))}
          <Typography variant="body2" color="textSecondary" align="center">
            Address
          </Typography>
          {addressTextFields.map((input) => (
            <TextField
              key={input.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={input.name}
              label={input.label}
              name={`address.${input.name}`}
              value={formValue.address[input.name]}
              onChange={handleChange}
            />
          ))}
          <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleClick}>
            Добавить в таблицу
          </Button>
        </form>
      </div>
    </Container>
  );
};

import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import Error from '../Shared/Error'

const Login = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event, tokenAuth) => {
    try {
      event.preventDefault()
      const res = await tokenAuth()
      localStorage.setItem('authToken', res.data.tokenAuth.token)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant='title'>
          Log in to your account
        </Typography>
        <Mutation mutation={LOGIN_MUTATION}
          variables={{ username, password }}
        >
          {(tokenAuth, { loading, error }) => {

            return (
              <form className={classes.form} onSubmit={event => handleSubmit(event, tokenAuth)}>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='username'>Username</InputLabel>
                  <Input id='username' value={username} onChange={event => setUsername(event.target.value)} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input id='password' type='password' value={password} onChange={event => setPassword(event.target.value)} />
                </FormControl>
                <Button type='submit' disabled={loading || !username.trim() || !password.trim()} fullWidth variant='contained' color='primary' className={classes.submit}>
                  {loading ? 'Logging in...' : 'Log in'}
                </Button>
                <Button onClick={() => setNewUser(true)} fullWidth variant='outlined' color='secondary'>New user? Register here</Button>

                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </Paper>
    </div>
  )
};

const LOGIN_MUTATION = gql`
mutation($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Login);
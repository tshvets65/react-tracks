import React from "react";
import { ApolloConsumer } from 'react-apollo'
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const Signout = ({ classes }) => {
  const mombileSize = useMediaQuery('(max-width: 650px)')

  const handleSignout = client => {
    localStorage.removeItem('authToken')
    client.writeData({ data: { isLoggedIn: false } }) // can also use client.resetState()
  }

  return (
    <ApolloConsumer>
      {client => (
        <Button onClick={() => handleSignout(client)}>
          <Typography variant='body1' className={mombileSize ? classes.mobile : classes.buttonText} color='secondary'>
            Log out
          </Typography>
          <ExitToApp className={classes.buttonIcon} color='secondary' />
        </Button>
      )}
    </ApolloConsumer>
  )
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonIcon: {
    marginLeft: "5px"
  },
  buttonText: {
    fontSize: '14px'
  },
  mobile: {
    display: "none"
  }
};

export default withStyles(styles)(Signout);

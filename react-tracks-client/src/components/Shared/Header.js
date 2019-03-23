import React from "react";
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import RadioIcon from "@material-ui/icons/RadioTwoTone";
// import FaceIcon from "@material-ui/icons/FaceTwoTone";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import Logo from '../../assets/images/Music.png'

import Signout from '../Auth/Signout'

const Header = ({ classes, currentUser }) => {
  const mombileSize = useMediaQuery('(max-width: 650px)')

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Link to='/' className={classes.grow}>
          {/* <RadioIcon className={classes.logo} color='secondary' /> */}
          <img src={Logo} style={{ width: '40px', marginRight: '10px' }} alt='Logo' />
          <Typography variant='h5' color='secondary' noWrap className={mombileSize ? classes.mobile : ''}>
            ReactTracks
          </Typography>
        </Link>
        {currentUser && (
          <Link to={`/profile/${currentUser.id}`} className={classes.grow}>
            <Typography className={classes.username} noWrap>
              Logged in as <strong>{currentUser.username}</strong>
            </Typography>
          </Link>
        )}
        <Signout />
      </Toolbar>
    </AppBar >
  )
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  logo: {
    marginRight: theme.spacing.unit,
    fontSize: 45
  },
  faceIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 30,
    color: "white"
  },
  username: {
    color: "white",
    fontSize: 16
  },
  mobile: {
    display: "none"
  }
});

export default withStyles(styles)(Header);

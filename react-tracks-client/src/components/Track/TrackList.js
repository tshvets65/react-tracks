import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioPlayer from '../Shared/AudioPlayer'
import LikeTrack from './LikeTrack'
import DeleteTrack from './DeleteTrack'
import UpdateTrack from './UpdateTrack'
import { UserContext } from '../../Root'
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const TrackList = ({ classes, tracks }) => {
  const currentUser = useContext(UserContext)
  const mombileSize = useMediaQuery('(max-width: 650px)')

  return (
    <List>
      {tracks.map(track => (
        <ExpansionPanel key={track.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem className={classes.root}>
              <LikeTrack trackId={track.id} likeCount={track.likes.length} />
              <ListItemText
                primaryTypographyProps={{ variant: 'subtitle1', color: 'primary' }}
                primary={track.title}
                secondary={<span>
                  Uploaded by <Link to={`/profile/${track.postedBy.id}`}>
                    {track.postedBy.username}
                  </Link>
                </span>
                }
              />
              <AudioPlayer url={track.url} mombileSize={mombileSize} />
            </ListItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography variant='body2'>{track.description}</Typography>
          </ExpansionPanelDetails>
          {currentUser.id === track.postedBy.id && <ExpansionPanelActions>
            <UpdateTrack track={track} />
            <DeleteTrack track={track} />
          </ExpansionPanelActions>}
        </ExpansionPanel>
      ))}
    </List>
  )
}

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(TrackList);

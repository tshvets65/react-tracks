import React, { useState } from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from '../Shared/Error'

const UpdateTrack = ({ classes, track }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(track.title)
  const [description, setDescription] = useState(track.description)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event, updateTrack) => {
    event.preventDefault()
    setSubmitting(true)
    updateTrack({ variables: { trackId: track.id, title, description, url: track.url } })
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Mutation mutation={UPDATE_TRACK_MUTATION} onCompleted={() => {
        setOpen(false)
        setSubmitting(false)
        setTitle('')
        setDescription('')
      }}
      >
        {(updateTrack, { loading, error }) => {
          if (error) return <Error error={error} />
          return (
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={event => handleSubmit(event, updateTrack)}>
                <DialogTitle>Update Track Info</DialogTitle>
                <DialogContent>

                  <FormControl fullWidth>
                    <TextField
                      label='Title'
                      placeholder='Add title'
                      className={classes.TextField}
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      multiline rows='4'
                      label='Description'
                      placeholder='Add description'
                      className={classes.TextField}
                      value={description}
                      onChange={event => setDescription(event.target.value)}
                    />
                  </FormControl>

                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={submitting}
                    onClick={() => setOpen(false)}
                    className={classes.cancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={submitting || !title.trim() || !description.trim()}
                    type='submit' className={classes.save}>
                    {submitting ? <CircularProgress className={classes.save} size={24} /> : 'Update track'}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          )
        }}
      </Mutation>

    </>
  )
};

const UPDATE_TRACK_MUTATION = gql`
mutation($trackId: Int!, $title: String, $description: String, $url: String) {
  updateTrack(trackId: $trackId, title: $title, description: $description, url: $url) {
    track {
      id
      title
      description
      url
      likes {
        id
      }
      postedBy {
        id
        username
      }
    }
  }
}
`

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing.unit
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(UpdateTrack);

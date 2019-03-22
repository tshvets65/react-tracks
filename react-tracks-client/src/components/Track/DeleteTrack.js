import React from "react";
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import { GET_TRACKS_QUERY } from '../../pages/App'

const DeleteTrack = ({ track }) => {

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY })
    const tracks = data.tracks.filter(track => Number(track.id) !== deleteTrack.trackId)
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } })
  }

  return (
    <Mutation mutation={DELETE_TRACK_MUTATION}
      variables={{ trackId: track.id }}
      update={handleUpdateCache}
    // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}
    >
      {deleteTrack => (
        <IconButton onClick={deleteTrack}>
          <TrashIcon />
        </IconButton>
      )}
    </Mutation>
  )
};

const DELETE_TRACK_MUTATION = gql`
mutation($trackId: Int!) {
  deleteTrack(trackId: $trackId) {
    trackId
  }
}
`

export default DeleteTrack;

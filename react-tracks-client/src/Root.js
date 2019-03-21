import React from "react";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import withRoot from "./withRoot";

const Root = () => (
    <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error {error.message}</p>

            return <p>{JSON.stringify(data)}</p>
        }}
    </Query>
)

const GET_TRACKS_QUERY = gql`
{
    tracks {
        id
        title
        description
        url
    }
}
`

const ME_QUERY = gql`
{
    me {
        id
        username
        email
    }
}
`

export default withRoot(Root);

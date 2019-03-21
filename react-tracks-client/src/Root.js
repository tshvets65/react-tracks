import { gql } from 'apollo-boost';
import React from "react";
import { Query } from 'react-apollo';
import withRoot from "./withRoot";

const Root = () => (
    <Query query={GET_TRACKS_QUERY}>
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

export default withRoot(Root);

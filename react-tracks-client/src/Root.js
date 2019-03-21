import React from "react";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import withRoot from "./withRoot";
import App from './pages/App'
import Profile from './pages/Profile'
import Header from './components/Shared/Header'
import Loading from './components/Shared/Loading'
import Error from './components/Shared/Error'

const Root = () => (
    <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <Loading />
            if (error) return <Error error={error} />

            const currentUser = data.me

            return (
                <BrowserRouter>
                    <>
                        <Header currentUser={currentUser} />
                        <Switch>
                            <Route exact path='/' component={App} />
                            <Route path='/profile/:id' component={Profile} />
                        </Switch>
                    </>
                </BrowserRouter>
            )
        }}
    </Query>
)

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

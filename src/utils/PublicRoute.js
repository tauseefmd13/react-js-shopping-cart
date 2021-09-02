import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

const PublicRoute = () => {
    return (
        <Route
            {...rest}
            render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}

export default PublicRoute;

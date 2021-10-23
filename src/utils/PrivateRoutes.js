import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
        return (
            <Route
                {...rest}
                render={(routeProps) => <Component {...routeProps} {...rest} />}
            />
        );
    } else {
        return (
            <Route
                render={(routeProps) => (
                    <Redirect to="/" {...routeProps} {...rest} />
                )}
            />
        );
    }
}

export default PrivateRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const token = localStorage.getItem('token')

    if (token) {
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
                    <Redirect to="/area-do-funcionario" {...routeProps} {...rest} />
                )}
            />
        );
    }
}

export default PrivateRoute;
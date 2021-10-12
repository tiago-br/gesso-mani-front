import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminPrivateRoute({ component: Component, ...rest }) {
    const admin = localStorage.getItem('admin')
    if (admin==="ebq$lS6h$@IqGbzM7jNFFZCe70gg&t*5F&9pnNRxTgPVak7Q*%") {
        return (
            <Route
                {...rest}
                render={(routeProps) => <Component {...routeProps} {...rest} />}
            />
        );
    }else {
        return (
            <Route
                render={(routeProps) => (
                    <Redirect to="/sistema/vendas" {...routeProps} {...rest}/>
                    
                )}
            />
        );
    }
   
}

export default AdminPrivateRoute;
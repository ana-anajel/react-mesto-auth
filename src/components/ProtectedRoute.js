import React from "react";
import { Route, Redirect } from "react-router-dom";
import Main from './Main';

const ProtectedRoute = ({ component: Component, ...props }) => {
  //console.log(Component);
  return (
    <Route >
      {() => {
        console.log(<Redirect to='/sign-in' />, <Component {...props} />);
        props.loggedIn ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
      }
    </Route>
  )
}
export default ProtectedRoute;
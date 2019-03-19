import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import App from "./App";
class Routes extends React.Component {
  //npm run dev
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path={"/"} component={Login} />
          <Route
            exact
            path={"/chatroom/user/:appUserId(\\d+)"}
            component={App}
          />
        </React.Fragment>
      </Router>
    );
  }
}
export default Routes;

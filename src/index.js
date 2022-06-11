import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/admin.js";
import AuthLayout from "layouts/auth.js";
import AlertsProvider from 'context/alerts/provider';
import SecureRoutesProvider from "context/secureRoutes/provider";

window.process = {};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <SecureRoutesProvider>
        <AlertsProvider>
          <Route path={process.env.PUBLIC_URL + "/auth"} render={props => <AuthLayout {...props} />} />
          <Route path={process.env.PUBLIC_URL + "/admin"} render={props => <AdminLayout {...props} />} />
          {
            /*
                <Redirect from={process.env.PUBLIC_URL + "/"} to={process.env.PUBLIC_URL + "/auth/login"} />
          {
            process.env.NODE_ENV === "development" ?
              <Redirect to={process.env.PUBLIC_URL + "/auth/login"} /> : null
          }
            */
          }
        </AlertsProvider>
      </SecureRoutesProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

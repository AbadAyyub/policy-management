import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm";

import DashBoard from "./components/DashBoard";
import ViewPolicies from "./components/ViewPolicies";
import PurchasePolicy from "./components/PurchasePolicy";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

//import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";

import history from "./services/history";
import SignInForm from "./components/SignInForm";
import ViewPolicy from "./components/ViewPolicies";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={SignInForm} />
          <Route exact path="/dashBoard" component={DashBoard} />

          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/viewpolicies" component={ViewPolicy} />
          <Route exact path="/buyPolicies" component={PurchasePolicy} />
          <Route component={SignInForm}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

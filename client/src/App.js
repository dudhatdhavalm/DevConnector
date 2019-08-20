import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import "./App.css";
import Footer from "./Components/Layout/Footer";
import Landing from "./Components/Layout/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import { setAuthToken } from "./Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/AuthActions";
import jwt_decode from "jwt-decode";
import Dashboard from "./Components/Dashboard/Dashboard";
import { clearCurrentProfile } from "./Actions/ProfileActions";
import PrivateRoute from "./Components/Common/PrivateRoute";
import CreateProfile from "./Components/CreateProfile/CreateProfile";
import EditProfile from "./Components/EditProfile/EditProfile";
import AddExperience from "./Components/AddExperience/AddExperience";
import AddEducation from "./Components/AddEducation/AddEducation";
import Profiles from "./Components/Profiles/Profiles";
import Profile from "./Components/Profile/Profile";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Post/Post";

if (localStorage.jwtToken) {
  // set auth token to axios
  setAuthToken(localStorage.jwtToken);
  // decode auth token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user into redux store
  store.dispatch(setCurrentUser(decoded));

  // check token expired or not
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />

              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </div>
          <Route exact path="/" component={Landing} />
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;

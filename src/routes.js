import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Views/Home/Home";
import Profile from "./Views/Profile/Profile";
import Watchlist from "./Views/Watchlist/Watchlist";
import Screening from "./Views/Screening/Screening";
import AdminHome from "./Views/AdminHome/AdminHome";
import AdminScreening from "./Views/AdminScreening/AdminScreening";
import NewScreening from "./Views/NewScreening/NewScreening";
import RepStepOne from "./Views/NewReport/StepOne/RepStepOne";
import RepStepTwo from "./Views/NewReport/StepTwo/RepStepTwo";
import RepStepThree from "./Views/NewReport/StepThree/RepStepThree";
import RepStepFour from "./Views/NewReport/StepFour/RepStepFour";
import RepReview from "./Views/NewReport/ReviewReport/RepReview";
import Reports from "./Views/Reports/Reports";
import { connect } from "react-redux";

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default (
  <Switch>
    <Route
      path="/"
      exact
      component={connect(mapStateToProps)(props => {
        if (props.user.data && props.user.data.isadmin) {
          // console.log(props.user);
          return <AdminHome {...props} />;
        } else {
          // console.log(props.user);
          return <Home {...props} />;
        }
      })}
    />
    <Route path="/screening/:id" component={Screening} />
    <Route
      path="/profile"
      component={connect(mapStateToProps)(props => {
        if (props.isAuthed) {
          return <Profile {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/watchlist"
      component={connect(mapStateToProps)(props => {
        if (props.isAuthed) {
          return <Watchlist {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route path="/admin/screening/edit/:id" component={NewScreening} />
    <Route
      path="/admin/screening/:id"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <AdminScreening {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />

    <Route
      path="/admin/reports"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <Reports {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step1"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <RepStepOne {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step2"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <RepStepTwo {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step3"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <RepStepThree {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step4"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <RepStepFour {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/final/:id"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <RepReview {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/add/screening"
      component={connect(mapStateToProps)(props => {
        if (props.user[0] && props.user.data.isadmin) {
          return <NewScreening {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route path="*" render={() => <h4>404 Not Found!</h4>} />
  </Switch>
);
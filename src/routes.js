import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Views/Home/Home";
// import Profile from "./Views/Profile/Profile";
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
import ScreeningData from "./Views/ScreeningData/ScreeningData";
import NewEmail from "./Views/NewEmail/NewEmail";

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default (
  <Switch>
    <Route
      path="/"
      exact
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          console.log(props.user && props.user.isadmin);
          // return <Redirect to="/admin" />
          return <AdminHome {...props} />;
        } else {
          console.log(props.user && props.user.isadmin);
          return <Home {...props} />;
        }
      })}
    />
    {/* <Route
      path="/profile"
      component={connect(mapStateToProps)(props => {
        if (props.isAuthed) {
          return <Profile {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })} */}
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
    <Route path="/screening/:id" component={Screening} />
    <Route
      path="/admin/screening/edit/:id"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          // console.log(props.user && props.user.isadmin);
          return <NewScreening {...props} />;
        } else {
          // console.log(props.user && props.user.isadmin);
          return <Home {...props} />;
        }
      })}
    />
    <Route
      path="/admin/screening/:id"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <AdminScreening {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/data/:id"
      component={ScreeningData}
    // component={connect(mapStateToProps)(props => {
    //   if (props.user && props.user.isadmin) {
    //     return <NewScreening {...props} />;
    //   } else {
    //     return <Redirect to="/" />;
    //   }
    // })}
    />
    <Route
      path="/admin/send"
      component={NewEmail}
    />
    <Route
      path="/admin/reports"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <Reports {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step1"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <RepStepOne {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step2"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <RepStepTwo {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step3"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <RepStepThree {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/step4"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <RepStepFour {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/report/final/:id"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <RepReview {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />
    <Route
      path="/admin/add/screening"
      component={connect(mapStateToProps)(props => {
        if (props.user && props.user.isadmin) {
          return <NewScreening {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      })}
    />

    <Route path="*" render={() => <h4>404 Not Found!</h4>} />
  </Switch>
);
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import Home from "../Views/Home/Home";
import Profile from "./Views/Profile/Profile";
import Watchlist from "./Views/Watchlist/Watchlist";
import Screening from "./Views/Screening/Screening";
import AdminHome from "./Views/AdminHome/AdminHome";
import AdminScreening from "./Views/AdminScreening/AdminScreening";
import NewScreening from "./Views/NewScreening/NewScreening";
import { connect } from "react-redux";

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default (
  <Switch>
    <Route 
      path="/" 
      exact 
      component={AdminHome}
      // component={connect(mapStateToProps)(props => {
      //   if(props.user.data && props.user.data.isadmin) {
      //     console.log(props.user);
      //     return <AdminHome {...props} />;
      //   } else {
      //     console.log(props.user);
      //     return <Home {...props} />;
      //   }
      // })}
    />
    <Route path="/screening/:id" component={Screening} />
    <Route
      path="/profile"
      component={connect(mapStateToProps)(props => {
        if(props.isAuthed) {
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
    <Route 
      path='/admin/movie/:id'
      component={AdminScreening}
      // component={connect(mapStateToProps)(props => {
      //   if (props.user[0] && props.user.data.isadmin) {
      //     return <AdminHome {...props} />;
      //   } else {
      //     return <Redirect to="/" />;
      //   }
      // })} 
    />
    <Route path='/admin/add/screening' component={NewScreening} />
    <Route path="*" render={() => <h4>404 Not Found!</h4>} />
  </Switch>
);
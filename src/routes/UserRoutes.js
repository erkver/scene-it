import React,{ Component } from "react";
import { connect } from "react-redux";

class UserRoutes extends Component {
  componentDidMount() {
    const { url, dispatch } = this.props;
    const { REACT_APP_LOGIN } = process.env;
    if(!isAuthed) {
      dispatch(setRedirectUrl(url));
      browserHistory.replace(REACT_APP_LOGIN)
    }
  }

  render() {
    return {
      
      if(isAuthed) {
        return this.props.children;
      } else {
        return null;
      }
    }
  }
}

function mapStateToProps({ userReducer }, ownProps) {
  return {
    isAuthed: ({ ...userReducer }).state.isAuthed,
    url: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(UserRoutes);

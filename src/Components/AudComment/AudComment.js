import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  editPressComment,
  deletePressComment,
  getPressComments
} from "../../Ducks/audCommentReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PressComment.scss";

class AudComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aCommentInput: "",
      aName: "",
      aOutlet: "",
      edit: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { aComm } = this.props;
    if(aComm) {
      console.log(this.props);
      this.setState({
        aCommentInput: aComm.comment,
        aName: aComm.name,
        aOutlet: aComm.outlet
      });
    }
  }

  render() {
    const { aComm, editPressComment, deletePressComment, report } = this.props;
    const { edit, aCommentInput, aName, aOutlet } = this.state;
    console.log(aComm);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-aComm-cont" : "edit-ind-aComm-cont"}>
        {!edit ? (
          <>
            <div className="aComm-text-cont">
              <p>{aComm.name} - {aComm.outlet}</p>
              <p>"{aComm.comment}"</p>
            </div>
            <button id="expand-arr" onClick={() => this.setState({ edit: !this.state.edit })}>
              <FontAwesomeIcon
                icon="angle-double-down"
                className="expand-arr"
              />
            </button>
          </>
        ) : (
            <>
              <div className="aComm-text">
                <div className="aComm-inputs-cont">
                  <div className="name-outlet-cont">
                    <input
                      required
                      placeholder="Name"
                      value={aName}
                      onChange={e => this.setState({ pName: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Oulet"
                      value={aOutlet}
                      onChange={e => this.setState({ pOutlet: e.target.value })}
                    />
                  </div>
                  <textarea
                    value={aCommentInput}
                    onChange={e => this.setState({ pCommentInput: e.target.value })}
                    type="text"
                    rows="3"
                  />
                </div>
                <button
                  onClick={() => this.setState({ edit: !this.state.edit })}
                ><FontAwesomeIcon
                    icon="angle-double-up"
                    className="expand-arr"
                  />
                </button>
              </div>
              <div className="aComm-btn-cont">
                <button
                  onClick={() => {
                    deletePressComment(aComm.tpc_id);
                    this.setState({ edit: !this.state.edit });
                  }}>
                  Delete comment
              </button>
                <button
                  onClick={() => {
                    editPressComment(aComm.tpc_id, aName, aOutlet, aCommentInput);
                    this.setState({ edit: !this.state.edit });
                  }}
                >
                  Submit edit
              </button>
              </div>
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer,
  pressCommentReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...pressCommentReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { editPressComment, deletePressComment, getPressComments }
  )(AudComment))
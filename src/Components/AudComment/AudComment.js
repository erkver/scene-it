import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  editAudComment,
  deleteAudComment,
  getAudComments
} from "../../Ducks/audCommentReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AudComment.scss";

class AudComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aCommentInput: "",
      aGender: "default",
      aAge: 0,
      edit: false
    };
  }

  componentDidMount() {
    // console.log(this.props);
    const { aComm } = this.props;
    if(aComm) {
      // console.log(this.props);
      this.setState({
        aCommentInput: aComm.comment,
        aGender: aComm.gender,
        aAge: aComm.age
      });
    }
  }

  render() {
    const { aComm, editAudComment, deleteAudComment } = this.props;
    const { edit, aCommentInput, aAge, aGender } = this.state;
    // console.log(aComm);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-aComm-cont" : "edit-ind-aComm-cont"}>
        {!edit ? (
          <>
            <div className="aComm-text-cont">
              <p>{aComm.gender} - {aComm.age}</p>
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
                      placeholder="Age"
                      value={aAge}
                      onChange={e => this.setState({ aAge: e.target.value })}
                    />
                    <select
                      value={aGender}
                      onChange={e => this.setState({ aGender: e.target.value })}>
                      <option disabled hidden value="default" >Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <textarea
                    value={aCommentInput}
                    onChange={e => this.setState({ aCommentInput: e.target.value })}
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
                    deleteAudComment(aComm.tac_id);
                    this.setState({ edit: !this.state.edit });
                  }}>
                  Delete comment
              </button>
                <button
                  onClick={() => {
                    editAudComment(aComm.tac_id, aGender, aAge, aCommentInput);
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
  audCommentReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...audCommentReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { editAudComment, deleteAudComment, getAudComments }
  )(AudComment))
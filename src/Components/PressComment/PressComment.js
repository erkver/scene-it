import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  editPressComment,
  deletePressComment,
  getPressComments
} from "../../Ducks/pressCommentReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PressComment.scss";

class PressComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pCommentInput: "",
      pName:"",
      pOutlet: "",
      edit: false
    };
  }

  componentDidMount() {
    // console.log(this.props);
    const { prComm } = this.props;
    if(prComm) {
      // console.log(this.props);
      this.setState({
        pCommentInput: prComm.comment,
        pName: prComm.name,
        pOutlet: prComm.outlet });
    }
  }

  render() {
    const { prComm, editPressComment, deletePressComment } = this.props;
    const { edit, pCommentInput, pName, pOutlet } = this.state;
    // console.log(prComm);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-pComm-cont" : "edit-ind-pComm-cont"}>
        {!edit ? (
          <>
            <div className="pComm-text-cont">
              <p>{prComm.name} - {prComm.outlet}</p>
              <p>"{prComm.comment}"</p>
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
              <div className="pComm-text">
                <div className="pComm-inputs-cont">
                  <div className="name-outlet-cont">
                  <input
                    required
                    placeholder="Name"
                    value={pName}
                    onChange={e => this.setState({ pName: e.target.value })}
                  />
                  <input
                    required
                    placeholder="Oulet"
                    value={pOutlet}
                    onChange={e => this.setState({ pOutlet: e.target.value })}
                  />
                  </div>
                  <textarea
                    required
                    value={pCommentInput}
                    onChange={e => this.setState({ pCommentInput: e.target.value })}
                    type="text"
                    rows="3"
                  />
                </div>
                <button
                  onClick={() => this.setState({ edit: !this.state.edit })}
                ><FontAwesomeIcon
                    icon="angle-double-up"
                    className="close-arr"
                  />
                </button>
              </div>
              <div className="pComm-btns-cont">
                <button
                  onClick={() => {
                    deletePressComment(prComm.tpc_id);
                    this.setState({ edit: !this.state.edit });
                  }}>
                  Delete comment
              </button>
                <button
                  onClick={() => {
                    editPressComment(prComm.tpc_id, pName, pOutlet, pCommentInput);
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
  )(PressComment)
);
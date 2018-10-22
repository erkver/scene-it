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
    console.log(this.props);
    const { prComm } = this.props;
    if(prComm) {
      console.log(this.props);
      this.setState({
        pCommentInput: prComm.comment,
        pName: prComm.name,
        pOutlet: prComm.outlet });
    }
  }

  componentDidUpdate(prevProps) {
    const { prComm, getPressComments, report } = this.props;
    if (prComm.comment !== prevProps.prComm.comment) {
      getPressComments(report[0].tr_id);
      this.setState({
        pCommentInput: prComm.comment,
        pName: prComm.name,
        pOutlet: prComm.outlet
      })
    }
  }

  render() {
    const { prComm, editPressComment, deletePressComment, updatePressComment, report } = this.props;
    const { edit, sceneInput } = this.state;
    // console.log(repScene.ts_id);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-scene-cont" : "edit-ind-scene-cont"}>
        {!edit ? (
          <>
            <p>{prComm.name} - {prComm.outlet}</p>
            <p>{prComm.comment}</p>
            <button onClick={() => this.setState({ edit: !this.state.edit })}>
              <FontAwesomeIcon
                icon="angle-double-down"
                className="expand-arr"
              />
            </button>
          </>
        ) : (
            <>
              <div className="scene-text">
                <textarea
                  value={sceneInput}
                  placeholder={sceneInput}
                  onChange={e => this.setState({ sceneInput: e.target.value })}
                  type="text"
                  rows="3"
                />
                <button
                  onClick={() => this.setState({ edit: !this.state.edit })}
                ><FontAwesomeIcon
                    icon="angle-double-up"
                    className="expand-arr"
                  />
                </button>
              </div>
              <div className="scene-btn-cont">
                <button
                  onClick={() => {
                    deleteScene(repScene.ts_id);
                    updateScenes(report[0].tr_id)
                    this.setState({ edit: !this.state.edit });
                  }}>
                  Delete scene
              </button>
                <button
                  onClick={() => {
                    editScene(repScene.ts_id, sceneInput);
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
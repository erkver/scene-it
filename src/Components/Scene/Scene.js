import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editScene, deleteScene, getScenes } from "../../Ducks/sceneReducer";
import "./Scene.scss";

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneInput: "",
      edit: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { repScene } = this.props;
    if (repScene) {
      console.log(this.props);
      this.setState({ sceneInput: repScene.scene });
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.repScene.scene !== prevProps.repScene.scene) {
      this.props.getScenes(this.props.report[0].tr_id)
    }
  }

  render() {
    const { repScene, editScene, deleteScene } = this.props;
    const { edit, sceneInput } = this.state;
    // console.log(repScene.ts_id);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-scene-cont" : "edit-ind-scene-cont"}>
        {!edit ? (
          <>
            <p>{repScene.scene}</p>
            <button onClick={() => this.setState({ edit: !this.state.edit })}>
              Edit Scene
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
                  onClick={() => {
                    deleteScene(repScene.ts_id);
                    this.setState({ edit: !this.state.edit });
                  }}
                >
                  X
              </button>
            </div>
            <div className="scene-btn-cont">
              <button onClick={() => this.setState({ edit: !this.state.edit })}>
                  Cancel edit
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
  sceneReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...sceneReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { editScene, deleteScene, getScenes }
  )(Scene)
);
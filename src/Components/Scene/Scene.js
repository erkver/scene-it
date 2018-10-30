import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editScene, deleteScene, getScenes } from "../../Ducks/sceneReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    // console.log(this.props);
    const { repScene } = this.props;
    if (repScene) {
      // console.log(this.props);
      this.setState({ sceneInput: repScene.scene });
    }
  }

  editScenes = () => {
    const { sceneInput } = this.state;
    const { editScene, repScene } = this.props;
    editScene(repScene.ts_id, sceneInput);
    this.setState({ edit: !this.state.edit }); 
  }

  deleteScenes = () => {
    const { deleteScene, repScene } = this.props;
    deleteScene(repScene.ts_id);
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const { repScene } = this.props;
    const { edit, sceneInput } = this.state;
    // console.log(repScene.ts_id);
    // console.log(this.state);
    return (
      <div className={!edit ? "ind-scene-cont" : "edit-ind-scene-cont"}>
        {!edit ? (
          <>
            <p>{repScene.scene}</p>
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
                required
              />
              <button onClick={() => this.setState({ edit: !this.state.edit })}
                ><FontAwesomeIcon
                    icon="angle-double-up"
                    className="expand-arr"
                  />
              </button>
            </div>
            <div className="scene-btn-cont">
              <button onClick={() => this.deleteScenes()}>Delete scene</button>
              <button onClick={() => this.editScenes()}>Submit edit</button>
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
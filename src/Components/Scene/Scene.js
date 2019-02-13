import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Scene.scss';

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneInput: '',
      edit: false
    };
  }

  componentDidMount() {
    const { repScene } = this.props;
    if (repScene) {
      this.setState({ sceneInput: repScene.scene });
    }
  }

  editScene = () => {
    const { repScene } = this.props;
    this.props.editScenes(repScene.tS_id, repScene);
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { repScene } = this.props;
    const { edit, sceneInput } = this.state;
    return (
      <div className={!edit ? 'ind-scene-cont' : 'edit-ind-scene-cont'}>
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
              <button onClick={() => this.setState({ edit: !this.state.edit })}>
                <FontAwesomeIcon
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

export default connect(mapStateToProps)(Scene);

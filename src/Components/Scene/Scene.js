import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editScene, deleteScene } from "../../Ducks/sceneReducer";
import "./Scene.scss";

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneInput: "",
      edit: false
    }
  }

  componentDidMount() {
    const { repScene } = this.props;
    if(repScene[0]) {
      this.setState({editScene: repScene});
    }
  }

  render() {
    const { repScene, editScene, deleteScene } = this.props;
    const { edit, sceneInput } = this.state;
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="ind-scene-cont">
        {!edit ? 
        <>
          <p>{repScene.scene}</p>
          <button 
            onClick={() => this.setState({edit: !this.state.edit})}>Edit Scene</button>
        </>
        : <>
          <textarea 
            value={sceneInput}
            onChange={e => this.setState({sceneInput: e.target.value})}
            type="text"
            rows="2"
          />
          <button
            onClick={() => this.setState({ edit: !this.state.edit })}>Cancel edit</button>
          <button
            onClick={() => {
              editScene(repScene.ts_id, sceneInput); 
              this.setState({edit: !this.state.edit})}}>Submit edit</button>
          <button
            onClick={() => {
              deleteScene(repScene.ts_id); 
              this.setState({edit: !this.state.edit})}}>Delete scene</button>
        </>
        }
      </div>
    )
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
    { editScene, deleteScene }
  )(Scene)
);
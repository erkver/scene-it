import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getScenes } from "../../../Ducks/sceneReducer";
import { getPressComments } from "../../../Ducks/pressCommentReducer";
import { getAudComments } from "../../../Ducks/audCommentReducer";
import "./RepReview.scss";

class RepReview extends Component {
  constructor() {
    super();
    this.state = {
      newAttendance: 0,
      newRatio: 0,
      newReaction: "",
      newScene: "",
      newPressComment: "",
      newName: "",
      newOutlet: "",
      newAudienceComment: "",
      newGender: "",
      newAge: 0,
      editInfo: false,
      editScenes: false,
      editPressComments: false,
      editAudComments: false
    }
  }
  componentDidMount() {
    const { getScenes, getPressComments, getAudComments, report } = this.props;
    getScenes(report[0].tr_id);
    getPressComments(report[0].tr_id);
    getAudComments(report[0].tr_id);
  }
  render() {
    console.log(this.props);
    const { 
      screening, 
      report, 
      scenes, 
      pressComments, 
      audienceComments } = this.props;
    const { 
      newAttendance,
      newRatio,
      newReaction,
      newScene,
      newPressComment,
      newName,
      newOutlet,
      newAudienceComment,
      newGender,
      newAge,
      editInfo,
      editScenes,
      editPressComments,
      editAudComments } = this.state;
    let sceneList = scenes.map((scene, i) => {
      return (
        <div className="single-scene-cont" key={i}>
          {scene.scene}
        </div>
      )
    });
    let pressCommentList = pressComments.map((pressComment, i) => {
      return (
        <div className="single-pComment-cont" key={i}>
          <p>{pressComment.comment}</p>
          <p>{pressComment.name}</p>
          <p>{pressComment.outlet}</p>
        </div>
      )
    });
    let audCommentList = audienceComments.map((audComment, i) => {
      return (
        <div className="single-aComment-cont" key={i}>
          <p>{audComment.comment}</p>
          <p>{audComment.gender}</p>
          <p>{audComment.age}</p>
        </div>
      )
    });
    return (
      <div className="report-final-cont">
        <h1>Create Report</h1>
        <div className="report-final-inner-cont">
          <div className="report-info-cont">
            <button 
              onClick={() => this.setState({editInfo: !this.state.editInfo})}>
              {!editInfo ? "Edit Report Info" : "Done Editing"}</button>
            <p>Film Title: {screening[0].title}</p>
            <p>Attendance: {report[0].attendance} / {screening[0].seat_count}</p>
            <p>Booking Ratio: {report[0].ratio} : 1</p>
            <p>Overall Reaction: {report[0].reaction}</p>
          </div>
          {sceneList}
          {pressCommentList}
          {audCommentList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer,
  audCommentReducer,
  sceneReducer,
  pressCommentReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...audCommentReducer,
  ...sceneReducer,
  ...pressCommentReducer
});

export default withRouter(connect(mapStateToProps, {getScenes, getPressComments, getAudComments})(RepReview));
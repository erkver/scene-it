import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editReport } from "../../../Ducks/reportReducer";
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
      audienceComments,
      editReport } = this.props;
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
          {!editScenes ?
            <>
            {scene.scene}
            </>
            : <>
              {scene.scene}
              <button>Edit </button>
            </>
          }
        </div>
      )
    });
    let pressCommentList = pressComments.map((pressComment, i) => {
      return (
        <div className="single-pComment-cont" key={i}>
          <p>Comment: {pressComment.comment}</p>
          <p>Name: {pressComment.name}</p>
          <p>Outlet: {pressComment.outlet}</p>
        </div>
      )
    });
    let audCommentList = audienceComments.map((audComment, i) => {
      return (
        <div className="single-aComment-cont" key={i}>
          <p>Comment: {audComment.comment}</p>
          <p>Gender: {audComment.gender}</p>
          <p>Age: {audComment.age}</p>
        </div>
      )
    });
    return (
      <div className="report-final-cont">
        <h1>Create Report</h1>
        <div className="report-final-inner-cont">
          {/* <div className="report-info-cont"> */}
            {/* <button 
              onClick={() => this.setState({editInfo: !this.state.editInfo})}>
              {!editInfo ? "Edit Report Info" : "Done Editing"}</button> */}
            <Link to='/admin/report/step1'></Link>
            <p>Film Title: {screening[0].title}</p>
            <p>Attendance: {report[0].attendance} / {screening[0].seat_count}</p>
            <p>Booking Ratio: {report[0].ratio} : 1</p>
            <p>Overall Reaction: {report[0].reaction}</p>
            {/* <button
              onClick={() => this.setState({ editScenes: !this.state.editScenes })}>{editScenes ? "Done Editing" : "Edit Scenes"}</button> */}
            <Link to='/admin/report/step2'></Link>
            {sceneList}
            <Link to='/admin/report/step3'></Link>
            {pressCommentList}
            <Link to='/admin/report/step4'></Link>
            {audCommentList}
            {/* {!editInfo ?
              <>
                <p>Film Title: {screening[0].title}</p>
                <p>Attendance: {report[0].attendance} / {screening[0].seat_count}</p>
                <p>Booking Ratio: {report[0].ratio} : 1</p>
                <p>Overall Reaction: {report[0].reaction}</p>
              </>
              : <>
                <p>Film Title: {screening[0].title}</p>
                <p>Attendance: {report[0].attendance} / {screening[0].seat_count}</p>
                <input 
                  value={newAttendance}
                  type="number"
                  min="0"
                  max={`${screening[0].seat_count}`}
                  className="info-input"
                  placeholder="#"
                  onChange={e => this.setState({newAttendance: e.target.value})} />
                <p>Booking Ratio: {report[0].ratio} : 1</p>
                <input
                  type="number"
                  min=".5"
                  max="30"
                  required
                  placeholder="#"
                  className="info-input"
                  value={newRatio}
                  onChange={e => this.setState({ newRatio: e.target.value })} />
                <p>Overall Reaction: {report[0].reaction}</p>
                <select
                  defaultValue="default"
                  onChange={e => this.setState({ reaction: e.target.value })}>
                  <option disabled hidden value="default" >Change reaction</option>
                  <option>Excellent</option>
                  <option>Above Average</option>
                  <option>Average</option>
                  <option>Below Average</option>
                  <option>Poor</option>
                </select>
                <button 
                  onClick={() => editReport(
                    report[0].tr_id,
                    (newAttendance ? newAttendance : report[0].attendance),
                    (newRatio ? newRatio : report[0].ratio),
                    (newReaction ? newReaction : report[0].reaction)
                  )}
                  className="submit-edit-btn">Submit edits</button>
              </>
            }
            <button
              onClick={() => this.setState({editScenes: !this.state.editScenes})}>{editScenes ? "Done Editing" : "Edit Scenes"}</button>
            {!editScenes ? 
              <>
                {sceneList}
              </>
              : <>
                {sceneList}
              </>
            }
          </div>
          
          {pressCommentList}
          {audCommentList} */}
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

export default withRouter(
  connect(
    mapStateToProps, 
    {
      getScenes, 
      getPressComments, 
      getAudComments,
      editReport
    })
    (RepReview));
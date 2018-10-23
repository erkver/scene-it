import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editReport, getReport } from "../../../Ducks/reportReducer";
import { getScenes } from "../../../Ducks/sceneReducer";
import { getPressComments } from "../../../Ducks/pressCommentReducer";
import { getAudComments } from "../../../Ducks/audCommentReducer";
import "./RepReview.scss";

class RepReview extends Component {
  componentDidMount() {
    const { getScenes, getPressComments, getAudComments, report, getReport } = this.props;
    getReport(23);
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
    let sceneList = scenes.map((scene, i) => (
        <div className="single-scene-cont" key={i}>
          <p>Scene {i+1} - {scene.scene}</p>
        </div>
      )
    );
    let pressCommentList = pressComments.map((pressComment, i) => (
        <div className="single-pComment-cont" key={i}>
          <p>Comment {i+1}: {pressComment.name} - {pressComment.outlet}</p>
          <p>{pressComment.comment}</p>
        </div>
      )
    );
    let audCommentList = audienceComments.map((audComment, i) => (
        <div className="single-aComment-cont" key={i}>
          <p>Comment {i+1}: {audComment.gender} - {audComment.age}</p>
          <p>{audComment.comment}</p>
        </div>
      )
    );
    return (
      <div className="report-final-cont">
        <h1>View Report</h1>
        <div className="report-final-inner-cont">
          <div className="report-card-cont">
            <div className="report-card-cont-header">
            <h2>Screening Info:</h2>
            <Link to='/admin/report/step1'>Edit Report</Link>
            </div>
            <p>Film Title: {screening[0].title}</p>
            <p>Attendance: {report[0].attendance} / {screening[0].seat_count}</p>
            <p>Booking Ratio: {report[0].ratio} : 1</p>
            <p>Overall Reaction: {report[0].reaction}</p>
          </div>
          <div className="report-card-cont">
            <div className="report-card-cont-header">
              <h2>Scene:</h2>
              <Link to='/admin/report/step2'>Edit scenes</Link>
            </div>
            {sceneList}
          </div>
          <div className="report-card-cont">
            <div className="report-card-cont-header">
              <h2>Press Comments:</h2>
              <Link to='/admin/report/step3'>Edit press comments</Link>
            </div> 
            {pressCommentList}
          </div>
          <div className="report-card-cont"> 
            <div className="report-card-cont-header">
              <h2>Audience Comments:</h2>         
              <Link to='/admin/report/step4'>Edit aud. comments</Link>
            </div>
            {audCommentList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer,
  audCommentReducer,
  sceneReducer,
  pressCommentReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...audCommentReducer,
  ...sceneReducer,
  ...pressCommentReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps, 
    {
      getScenes, 
      getPressComments, 
      getAudComments,
      editReport,
      getReport
    })(RepReview));
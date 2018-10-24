import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editReport, getReport } from "../../../Ducks/reportReducer";
import { getScenes } from "../../../Ducks/sceneReducer";
import { getPressComments } from "../../../Ducks/pressCommentReducer";
import { getAudComments } from "../../../Ducks/audCommentReducer";
import { getScreening } from "../../../Ducks/screeningReducer";
import "./RepReview.scss";

class RepReview extends Component {
  componentDidMount() {
    const { getScenes, getPressComments, getAudComments, getScreening, getReport, report } = this.props;
    const { id } = this.props.match.params;
    getReport(+id).then(res => {
      console.log(res.value.data[0].movieid);
      const { data } = res.value;
      getScreening(data[0].movieid);
      getScenes(data[0].tr_id);
      getPressComments(data[0].tr_id);
      getAudComments(data[0].tr_id);
    });
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
        <div className="single-comment-cont" key={i}>
          <p><u>Scene {i + 1}</u>: {scene.scene}</p>
        </div>
      )
    );
    let pressCommentList = pressComments.map((pressComment, i) => (
        <div className="single-comment-cont" key={i}>
          <p><u>Comment {i + 1}</u>: {pressComment.name} - {pressComment.outlet}</p>
          <p>"{pressComment.comment}"</p>
        </div>
      )
    );
    let audCommentList = audienceComments.map((audComment, i) => (
        <div className="single-comment-cont" key={i}>
          <p><u>Comment {i + 1}</u>: {audComment.gender} - {audComment.age}</p>
          <p>"{audComment.comment}"</p>
        </div>
      )
    );
    return (
      <div className="report-final-cont">
        <h1>View Report</h1>
        <div className="report-final-inner-cont">
          <div className="report-card-cont-final">
            <div className="report-card-cont-header">
            <h2>Screening Info:</h2>
            <Link className="report-links" to='/admin/report/step1'>Edit Report</Link>
            </div>
            <p>Film Title: {(screening[0] && screening[0].title) || (report[0] && report[0].title)}</p>
            <p>Attendance: {report[0] && report[0].attendance} / {screening[0] && screening[0].seat_count}</p>
            <p>Booking Ratio: {report[0] && report[0].ratio}:1</p>
            <p>Overall Reaction: {report[0] && report[0].reaction}</p>
          </div>
          <div className="report-card-cont-final">
            <div className="report-card-cont-header">
              <h2>Scene:</h2>
              <Link className="report-links" to='/admin/report/step2'>Edit scenes</Link>
            </div>
            {sceneList}
          </div>
          <div className="report-card-cont-final">
            <div className="report-card-cont-header">
              <h2>Press Comments:</h2>
              <Link className="report-links" to='/admin/report/step3'>Edit press comments</Link>
            </div> 
            {pressCommentList}
          </div>
          <div className="report-card-cont-final"> 
            <div className="report-card-cont-header">
              <h2>Audience Comments:</h2>         
              <Link className="report-links" to='/admin/report/step4'>Edit aud. comments</Link>
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
      getReport,
      getScreening
    })(RepReview));
import React from "react";
import "./SingleReport.scss";
import { Link } from "react-router-dom";

export default function SingleReport(props) {
  const { report, getReport } = props;
  // console.log(props);
  return (
    <div className="report-card-cont">
      <div className="inner-card-cont">
        <p>Film: {report.title}</p>
        <p>Theatre: {report.theatre_name}</p>
        <p>Fill info: {report.attendance}/{report.seat_count}</p>
        <p>Booking Ratio: {report.ratio}:1</p>
        <div className="btn-cont">
          <Link
            to={`/admin/report/final/${report.tr_id}`}
            className="info-btn"
            onClick={() => getReport(report.tr_id) }>More Info ></Link>
        </div>
      </div>
    </div>
  );
}
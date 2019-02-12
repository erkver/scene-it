import React from 'react';
import { Link } from 'react-router-dom';
import './SingleReport.scss';

export default function SingleReport(props) {
  const {
    title,
    theatre_name,
    attendance,
    seat_count,
    ratio,
    tr_id
  } = props.report;
  return (
    <div className="report-card-cont">
      <div className="inner-card-cont">
        <p>Film: {title}</p>
        <p>Theatre: {theatre_name}</p>
        <p>
          Fill info: {attendance}/{seat_count}
        </p>
        <p>Booking Ratio: {ratio}:1</p>
        <div className="btn-cont">
          <Link
            to={`/admin/report/final/${tr_id}`}
            className="info-btn"
            onMouseOver={() => props.getReport(tr_id)}
          >
            More Info >
          </Link>
        </div>
      </div>
    </div>
  );
}

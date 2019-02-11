import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="loader">
      {/* <FontAwesomeIcon icon="spinner" /> */}
      Loading...
    </div>
  );
};

export default Spinner;

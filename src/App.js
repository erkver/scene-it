import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Ducks/store';
import routes from './routes';
import Navbar from './Components/Navbar/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import ScrollToTop from 'react-router-scroll-top';
import {
  faCircleNotch,
  faSearchPlus,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faMapPin,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(
  faCircleNotch,
  faSearchPlus,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faMapPin,
  faSpinner
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <div id="main-react-app">
              <Navbar />
              {routes}
              <p className="footer">
                Data for this site provided by The Movie DB
              </p>
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

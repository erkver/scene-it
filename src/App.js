import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './App.scss';
import store from "./Ducks/store";
import routes from "./routes";
import Navbar from "./Components/Navbar/Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch, faSearchPlus, faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleNotch, faSearchPlus, faAngleDoubleDown, faAngleDoubleUp);

class App extends Component {
  render() {
    return <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            {routes}
            <p className="footer">Data for this site was provided by The Movie DB</p>
          </div>
        </BrowserRouter>
      </Provider>;
  }
}

export default App;

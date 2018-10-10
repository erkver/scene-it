import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './App.scss';
import store from "./Ducks/store";
import routes from "./routes/routes";
import Navbar from "./Components/Navbar/Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleNotch, faSearchPlus);

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

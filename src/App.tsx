import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import CharacterTable from "./components/CharacterTable";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <CharacterTable />
        </Provider>
      </div>
    </Router>
  );
}

export default App;

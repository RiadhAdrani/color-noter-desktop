import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import Home from "./components/Home/Home";
import Database from "./models/Database";

const App = (props) => {
     const [database, setDatabase] = useState(new Database({}));

     return (
          <Router>
               <SideBar show={database.id} />
               <Switch style={{ flex: 1 }}>
                    <Route exact path="/">
                         <Loading setDatabase={setDatabase} />
                    </Route>
                    <Route exact path="/home">
                         <Home database={database} />
                    </Route>
                    <Route exact path="/settings">
                         <h1>Yes</h1>
                    </Route>
                    <Route exact path="/about">
                         <h1>About</h1>
                    </Route>
               </Switch>
          </Router>
     );
};

export default App;

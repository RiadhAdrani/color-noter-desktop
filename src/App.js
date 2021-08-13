import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import Home from "./components/Home/Home";
import Database from "./models/Database";
import EditNote from "./components/Home/sub-components/EditNote";

const App = () => {
     const [database, setDatabase] = useState(new Database({}));
     const [edit, setEdit] = useState(false);

     return (
          <Router>
               {edit && (
                    <EditNote
                         edit={edit}
                         database={database}
                         trigger={() => {
                              setEdit(false);
                              console.log(edit);
                         }}
                    />
               )}
               <SideBar show={database.id} color={database.color} />
               <Switch style={{ flex: 1 }}>
                    <Route exact path="/">
                         <Loading setDatabase={setDatabase} />
                    </Route>
                    <Route exact path="/home">
                         <Home
                              database={database}
                              trigger={(e) => {
                                   setEdit(e);
                                   console.log(e);
                              }}
                              edit={edit}
                         />
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

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import Home from "./components/Home/Home";
import Database from "./models/Database";
import EditNote from "./components/Home/sub-components/EditNote";
import ChangeColor from "./components/ChangeColor";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const App = () => {
     const [database, setDatabase] = useState(new Database({}));
     const [edit, setEdit] = useState(false);
     const [colorWindow, setColorWindow] = useState({
          show: false,
          color: 0,
          onSelect: (color) => {},
     });

     function saveNote(note) {
          let index = -1;
          database.notes.forEach((n) => {
               if (n.uid === note.uid) return (index = database.notes.indexOf(n));
          });
          if (index === -1) {
               database.notes = [...database.notes, note];
          } else {
               database.notes = database.notes.map((n) => (note.uid === n.uid ? note : n));
          }
          database.lastSync = new Date().getTime();
          ipcRenderer.send("db:update", database);
          setEdit(false);
          Database.upload(database);
     }

     return (
          <Router>
               {colorWindow.show && (
                    <ChangeColor
                         current={colorWindow.color}
                         onExit={() => {
                              setColorWindow({ ...colorWindow, show: false });
                         }}
                         onSelect={(color) => {
                              colorWindow.onSelect(color);
                              setColorWindow({ ...colorWindow, show: false });
                              database.lastSync = new Date().getTime();
                              ipcRenderer.send("db:update", database);
                              Database.upload(database);
                         }}
                    />
               )}
               {edit && (
                    <EditNote
                         edit={JSON.parse(JSON.stringify(edit))}
                         database={database}
                         trigger={() => {
                              setEdit(false);
                         }}
                         save={(n) => {
                              saveNote(n);
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
                              }}
                              setColorWindow={(json) => {
                                   setColorWindow(json);
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

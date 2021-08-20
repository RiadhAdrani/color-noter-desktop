import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Database from "../../models/Database";
import logo from "../../assets/color-noter.png";
import "./Loading.css";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const Loading = (props) => {
     let history = useHistory();
     let [isConnected, setConnected] = useState(false);
     let [timedOut, setTimedOut] = useState(false);

     useEffect(() => {
          const db = new Database({});
          let localDB = {};

          ipcRenderer.send("db:get");
          ipcRenderer.on("db:send", (event, data) => {
               localDB = data;

               setTimeout(function () {
                    if (!isConnected && !timedOut && !data.id) {
                         setTimedOut(true);
                         props.setDatabase(localDB);
                         history.push("/home");
                    }
               }, 20000);

               if (!localDB.id) {
                    setConnected(true);
                    setTimedOut(true);
                    console.log("use local data");
                    history.push("/login");
               } else {
                    db.retrieveUserData(localDB.id, () => {
                         if (timedOut) {
                              console.log("timed out !");
                              return;
                         } else {
                              setConnected(true);
                         }
                         if (localDB.lastSync > db.lastSync && localDB.id && localDB.email) {
                              Database.upload(localDB);
                              props.setDatabase(localDB);
                         } else {
                              ipcRenderer.send("db:update", db);
                              props.setDatabase(db);
                         }
                         history.push("/home");
                    });
               }
          });
     });

     return (
          <div className="loading-screen">
               <img
                    src={logo}
                    alt="color noter"
                    width="150px"
                    height="150px"
                    style={{ borderRadius: "10px", marginBottom: "15px" }}
               />
               <h2>Color Noter : Desktop</h2>
               <p>Fetching data from server...</p>
               <div className="loader"></div>
          </div>
     );
};

export default Loading;

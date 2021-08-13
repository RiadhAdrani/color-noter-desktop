import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Database from "../../models/Database";
import "./Loading.css";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const Loading = (props) => {
     let history = useHistory();

     useEffect(() => {
          const db = new Database({});

          db.retrieveUserData(() => {
               ipcRenderer.send("db:get");
               ipcRenderer.on("db:send", (event, data) => {
                    if (data.lastSync >= db.lastSync) {
                         Database.upload(data);
                         props.setDatabase(data);
                    } else {
                         ipcRenderer.send("db:update", db);
                         props.setDatabase(db);
                    }

                    history.push("/home");
               });
          });
     });

     return (
          <div className="loading-screen">
               <div className="loader"></div>
               <h2>Color Noter</h2>
               <p>Fetching data from server...</p>
          </div>
     );
};

export default Loading;

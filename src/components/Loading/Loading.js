import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Database from "../../models/Database";
import logo from "../../assets/color-noter.png";
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

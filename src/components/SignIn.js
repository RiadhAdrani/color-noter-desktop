import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/color-noter.png";
import Database from "../models/Database";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const SignIn = (props) => {
     const [connecting, setConnecting] = useState(false);
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const history = useHistory();
     const [alert, setAlert] = useState({ text: "Failed to Login", show: false });

     useEffect(() => {});

     const style = `
     #login{
          flex:1;
          display:inline-flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          color:white;
     }
     #login-window{
          background-color:rgba(0,0,0,0.3);
          height:80%;
          width:65%;
          display:inline-flex;
          border-radius:10px;
          flex-direction:column;
          justify-content:center;
          align-items:center;
     }

     .input-field{
          font-family:inherit;
          font-size: 1.2em;
          padding:10px;
          margin-top:5px;
          margin-bottom:10px;
     }
     #sign-button{
          font-family:inherit;
          font-size: 1.0em;
          padding:10px;
          margin-top:5px;
          margin-bottom:10px;
     }
     .loader {
          border: 10px solid #f3f3f3; /* Light grey */
          border-top: 10px solid #e2b33c; /* Orange yellow */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
          margin-bottom: 10px;
     }
     .loading{
          
     }
     #alert-text{
          color:#ee5511;
     }
     `;
     return (
          <div id="login">
               <style>{style}</style>
               {connecting ? (
                    <div id="login-window">
                         <div className="loader"></div>
                         Connecting to the database
                    </div>
               ) : (
                    <div id="login-window">
                         <img
                              src={logo}
                              alt="logo"
                              width="100px"
                              style={{ borderRadius: "10px" }}
                         />
                         <h3>Sign in</h3>
                         <input
                              type="text"
                              className="input-field"
                              placeholder="username"
                              value={username}
                              onChange={(e) => {
                                   setUsername(e.target.value);
                              }}
                         />
                         <input
                              type="password"
                              className="input-field"
                              placeholder="password"
                              value={password}
                              onChange={(e) => {
                                   setPassword(e.target.value);
                              }}
                         />
                         <button
                              id="sign-button"
                              onClick={() => {
                                   setAlert({ text: "", show: false });
                                   if (!username.trim() || !password.trim()) {
                                        setAlert({
                                             text: "Username or/and password are too short or empty!",
                                             show: true,
                                        });
                                   } else {
                                        setConnecting(true);
                                        Database.getUserUUID(username.trim(), (uuid) => {
                                             Database.verifyCoordinate(
                                                  uuid,
                                                  username.trim(),
                                                  password.trim(),
                                                  () => {
                                                       setConnecting(false);
                                                       ipcRenderer.send(
                                                            "db:update",
                                                            new Database({
                                                                 id: username.trim(),
                                                                 lastSync: -1,
                                                            })
                                                       );
                                                       history.push("/");
                                                  },
                                                  () => {
                                                       setConnecting(false);
                                                       setAlert({
                                                            text: "Failed to login, please verify your input!",
                                                            show: true,
                                                       });
                                                  }
                                             );
                                        });
                                   }
                              }}
                         >
                              Sign in
                         </button>
                         {alert.show && <h5 id="alert-text">{alert.text}</h5>}
                         <h5>No account? Sign up for free!</h5>
                    </div>
               )}
          </div>
     );
};

export default SignIn;

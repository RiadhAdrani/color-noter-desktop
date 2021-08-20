import { Link, useHistory } from "react-router-dom";
import Theme from "../../models/Theme";
import logout from "../../assets/door-open.svg";
import logo from "../../assets/color-noter.png";
import "./SideBar.css";
import Database from "../../models/Database";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const SideBar = (props) => {
     const theme = Theme[props.database.color ? props.database.color : 0];
     const history = useHistory();

     const style = `
     .side-bar {
          color: whitesmoke;
          display: flex;
          z-index: 1000;
          width: 300px;
          left: 0px;
          flex-direction: column;
          height: 100%;
          background-color: #1d1f24;
          padding-left: 5px;
          box-shadow: 1px 1px 5px black;
     }
     
     .logo {
          color: aliceblue;
          font-size: 2em;
          text-align: center;
     }
     .router-links {
          display: flex;
          flex-direction: column;
     }
     .router-link {
          font-size: 1.3em;
          background-color: #272930;
          text-decoration: none;
          color: white;
          border-left: 5px ${theme.normal} solid;
          margin-bottom: 10px;
          margin-right: 5px;
          padding: 10px;
     }
     
     .side-bar-bottom {
          margin-top: auto;
          display: flex;
          flex-direction: row;
          text-decoration:none;
     }
     .side-bar-bottom:hover,.router-link:hover{
          background-color: #161616;
          cursor: pointer;
     }
     .side-bar-bottom:active,.router-link:active{
          background-color: ${theme.darker};
     }
     
     `;

     return (
          <div className="side-bar" style={{ display: props.show ? "flex" : "none" }}>
               <style>{style}</style>

               <div style={{ display: "flex", flexDirection: "column" }}>
                    <img
                         src={logo}
                         alt="logo"
                         width="100px"
                         height="100px"
                         style={{
                              marginRight: "auto",
                              marginLeft: "auto",
                              marginTop: "30px",
                              borderRadius: "10px",
                         }}
                    />
                    <p className="logo" style={{ marginBottom: "0px", marginTop: "15px" }}>
                         Color Noter
                    </p>
                    <p style={{ fontSize: "0.9em", textAlign: "center", marginBottom: "50px" }}>
                         Desktop App
                    </p>
               </div>

               <div className="router-links">
                    <Link
                         className="router-link"
                         to="/home"
                         style={{ borderLeftColor: theme.normal }}
                    >
                         Home
                    </Link>
                    <Link
                         className="router-link"
                         to="/settings"
                         style={{ borderLeftColor: theme.normal }}
                    >
                         Settings
                    </Link>
                    <Link
                         className="router-link"
                         to="/about"
                         style={{ borderLeftColor: theme.normal }}
                    >
                         About
                    </Link>
               </div>
               <Link
                    className="router-link"
                    onClick={() => {
                         props.setDatabase();
                         ipcRenderer.send("db:update", new Database({ id: "", lastSync: -1 }));
                         history.push("/login");
                    }}
                    style={{ marginTop: "auto" }}
               >
                    <img
                         src={logout}
                         alt={"logout"}
                         width={"30px"}
                         style={{
                              filter: "invert(100)",
                              marginRight: "20px",
                         }}
                    />
                    Log out
               </Link>
          </div>
     );
};

export default SideBar;

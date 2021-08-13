import { Link } from "react-router-dom";
import Theme from "../../models/Theme";
import logout from "../../assets/door-open.svg";
import "./SideBar.css";

const SideBar = (props) => {
     const theme = Theme[props.color];

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
          border-left: 5px white solid;
          margin-bottom: 10px;
          margin-right: 5px;
          padding: 10px;
     }
     
     .side-bar-bottom {
          margin-top: auto;
          display: flex;
          flex-direction: column;
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
                    <p className="logo" style={{ marginBottom: "0px" }}>
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
               <div className="side-bar-bottom">
                    <div
                         style={{
                              display: "flex",
                              flexDirection: "row",
                              borderLeft: `5px solid ${theme.normal}`,
                              paddingLeft: "10px",
                              marginBottom: "5px",
                         }}
                    >
                         <img
                              src={logout}
                              alt={"logout"}
                              width={"30px"}
                              style={{ filter: "invert(100)", marginRight: "20px" }}
                         />
                         <p>Log out</p>
                    </div>
               </div>
          </div>
     );
};

export default SideBar;

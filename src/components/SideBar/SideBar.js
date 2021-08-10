import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = (props) => {
     return (
          <div className="side-bar" style={{ display: props.show ? "flex" : "none" }}>
               <p className="logo">Color Noter</p>
               <div className="router-links">
                    <Link className="router-link" to="/home">
                         Home
                    </Link>
                    <Link className="router-link" to="/settings">
                         Settings
                    </Link>
                    <Link className="router-link" to="/about">
                         About
                    </Link>
               </div>
               <div className="side-bar-bottom">
                    <p>Log out</p>
               </div>
          </div>
     );
};

export default SideBar;

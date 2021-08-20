import logo from "../assets/color-noter.png";
import Theme from "../models/Theme";
const electron = window.require("electron");
const { shell } = electron;

const About = (props) => {
     const style = `
     #about{
          color:white;
          font-family:inherit;
          font-size:1.2em;
          display:inline-flex;
          flex-direction:column;
          text-align:center;
          margin-left:auto;
          margin-right:auto;
          justify-content:center;
          line-height:1.5em;
          flex:1;
     }

     #about-logo{
          margin-left:auto;
          margin-right:auto;
          margin-bottom:40px;
          border-radius:10px;
     }
     #external-link{
          margin-top:20px;
          color:white;
          cursor:pointer;
          display:inline;
          padding:5px;
          width:60%;
          margin-left:auto;
          margin-right:auto;
          transition-duration:0.33s;
          background-color:${Theme[props.color].dark};
     }
     #external-link:hover{
          color:${Theme[props.color].lighter};
          background-color:${Theme[props.color].darker};
     }
     `;
     return (
          <div id={"about"}>
               <style>{style}</style>
               <img id={"about-logo"} src={logo} alt="logo" width="125px" />
               This app is based on the mobile version of Color Noter.
               <br />
               This app is a learning project and it is not meant to be published or distributed.
               <br />
               Designed and created by Adrani Riadh
               <br />
               Follow me @
               <br />
               <span
                    id={"external-link"}
                    onClick={() => {
                         shell.openExternal("https://github.com/RiadhAdrani");
                    }}
               >
                    GitHub
               </span>
               <span
                    id={"external-link"}
                    onClick={() => {
                         shell.openExternal("https://www.behance.net/adraniriadh");
                    }}
               >
                    Behance
               </span>
               <span
                    id={"external-link"}
                    onClick={() => {
                         shell.openExternal("https://www.linkedin.com/in/riadh-adrani-7610781b0/");
                    }}
               >
                    LinkedIn
               </span>
               <span
                    id={"external-link"}
                    onClick={() => {
                         shell.openExternal(
                              "https://www.youtube.com/channel/UC33qa38p2oRIBfuMW8fRvgA"
                         );
                    }}
               >
                    Youtube
               </span>
          </div>
     );
};

export default About;

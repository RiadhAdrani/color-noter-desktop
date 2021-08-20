import Theme from "../models/Theme";

const Settings = (props) => {
     const style = `
     #settings{
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:center;
          background:linear-gradient(to right, 
               ${Theme[props.color].darker},
               ${Theme[props.color].dark},
               ${Theme[props.color].normal}, 
               ${Theme[props.color].light}
               );
     }
     #change-color{
          color:white;
          font-family:inherit;
          font-size:2em;
          width:50%;
          margin-right:auto;
          margin-left:auto;
          background-color:transparent;
          padding:10px;
     }
     `;

     return (
          <div id="settings">
               <style>{style}</style>
               <button
                    id="change-color"
                    onClick={() => {
                         props.useColorWindow();
                    }}
               >
                    Change Color
               </button>
          </div>
     );
};

export default Settings;

import Theme from "../../../models/Theme";

const ColorsWindow = (props) => {
     const style = `
     #colors-window-background{
          position:absolute;
          height:100%;
          width:100%;
          background-color:#282c34c9;
          z-index:20000;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
     }
     #colors-window{
          margin:15%;
          max-width:600px;
          background-color: #282c34;
          padding:15px;
          border-radius:10px;
          display:inline-flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
     }
     .color-square{
          height:75px;
          width:75px;
          border-radius:15px;
          margin:10px;
          transition:0.3s;
     }
     .color-square:hover{
          transform: scale(1.2);
     }
     #colors-group{
          display:inline-flex;
          flex-direction:row;
          justify-content:space-evenly;
          flex-wrap:wrap;
     }
     #cancel-button{
          width:100%;
          padding:0px;
          font-size:1.2em;
          font-family:inherit;
          margin: 10px;
          min-height:50px;
          border-radius:20px;
          cursor:pointer;
          color:white;
          background-color:${Theme[props.current].normal};
     }
     #cancel-button:hover{
          background-color:${Theme[props.current].dark};
     }
     #cancel-button:active{
          background-color:${Theme[props.current].darker};
     }
     `;

     return (
          <div id="colors-window-background">
               <style>{style}</style>
               <div id="colors-window">
                    <div id={"colors-group"}>
                         {Theme.map((e) => (
                              <div
                                   className="color-square"
                                   style={{ backgroundColor: e.normal }}
                                   onClick={() => {
                                        props.changeColor(Theme.indexOf(e));
                                        props.close(false);
                                   }}
                              ></div>
                         ))}
                    </div>
                    <button
                         id="cancel-button"
                         onClick={() => {
                              props.close(false);
                         }}
                    >
                         Cancel
                    </button>
               </div>
          </div>
     );
};

export default ColorsWindow;

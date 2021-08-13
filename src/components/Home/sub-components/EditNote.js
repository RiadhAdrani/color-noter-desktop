import { useState } from "react";
import Theme from "../../../models/Theme";
import ColorsWindow from "./ColorsWindow";
import paint from "../../../assets/paint-brush.svg";

const EditNote = (props) => {
     const [color, setColor] = useState(props.edit ? props.edit.color : 0);
     const [title, setTitle] = useState(props.edit ? props.edit.title : "");
     const [content, setContent] = useState(props.edit ? props.edit.content : "");
     const [openPopup, setOpen] = useState(false);

     console.log(props.edit.content);

     const theme = Theme[color];

     const style = `
     #edit-note-popup{
          position: absolute;
          height:100%;
          display: flex;
          flex-direction: column;
          width:100%;          
          background-color:#282c34c9;
          z-index: 10000;
     }
     #container{
          display:flex;
          flex-direction: column;
          margin:7%;
          border: 5px solid white;
          border-radius: 20px;
          padding: 30px;
          flex:1;
     }
     #title-box{
          padding:5px;
          font-size:1.5em;
          background-color:${theme.dark};
          color:white;
          flex-grow:1;
          
     }
     ::placeholder{
          color:grey;
     }
     #content-box{
          flex-grow:1;
          text-align: start; 
          padding:10px;
          font-family:inherit;
          resize:none;
     }
     .edit-buttons{
          background-color: ${theme.dark};
          color:white;
          padding:10px;
          margin-left:10px;
          font-size:1.25em;
          font-family:inherit;
     }

     .edit-buttons:hover{
          background-color: ${theme.darker};
     }
     #buttons-container{
          margin-top:20px;
          display:flex;
          flex-direction:row;
          align-items: flex-end;
          justify-content: flex-end;
     }
     #color-box{
          background-color:${theme.dark};
     }
     #color-box:hover{
          background-color:${theme.darker};
          cursor:pointer;
     }
     `;
     return (
          <div id="edit-note-popup">
               <style>{style}</style>
               {openPopup && (
                    <ColorsWindow
                         changeColor={(newColor) => {
                              setColor(newColor);
                         }}
                         current={color}
                         close={(bool) => {
                              setOpen(bool);
                         }}
                    />
               )}

               <div id="container">
                    <div
                         style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "inherit",
                              marginBottom: "20px",
                         }}
                    >
                         <input
                              id="title-box"
                              type="text"
                              placeholder="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                         />
                         <div
                              id={"color-box"}
                              style={{
                                   width: "50px",
                                   marginLeft: "20px",
                                   borderRadius: "5px",
                                   display: "flex",
                                   flexDirection: "column",
                                   justifyContent: "center",
                                   alignItems: "center",
                              }}
                              onClick={() => {
                                   setOpen(true);
                              }}
                         >
                              <img
                                   src={paint}
                                   alt="change color"
                                   width="25px"
                                   height="25px"
                                   style={{ filter: "invert(100)", margin: "auto" }}
                              />
                         </div>
                    </div>

                    <textarea
                         id="content-box"
                         type="text"
                         placeholder="what's in your mind today?"
                         value={content}
                         onChange={(e) => setContent(e.target.value)}
                    />
                    <div id="buttons-container">
                         <button className="edit-buttons">Save</button>
                         <button
                              className="edit-buttons"
                              onClick={() => {
                                   props.trigger();
                              }}
                         >
                              Cancel
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default EditNote;

import Theme from "../../../../models/Theme";
import check from "../../../../assets/check-box.svg";
import uncheck from "../../../../assets/uncheck-box.svg";
import paint from "../../../../assets/paint-brush.svg";
import trash from "../../../../assets/trash.svg";
import { useState } from "react";

const NoteCard = (props) => {
     const uid = props.note.uid;
     const title = props.note.title;
     const content = props.note.content;
     const color = props.note.color ? Theme[props.note.color] : Theme[0];
     const [confirm, setConfirm] = useState(false);

     const style = `
     #container-${uid}{
          display: flex;
          flex-direction:column;
          padding-top:5px;
          padding-bottom:5px;
          margin-bottom:30px;
          margin-left:10px;
          margin-right:10px;
          height:275px;
          width:250px;
          background-image: linear-gradient(to right, ${color.dark}, ${color.normal});
          border-radius: 10px;
          padding:15px;
          float: left;
          justify-content:start;
          transition-duration: 0.15s;
          overflow: hidden;
          transition-duration:0.2s;
          cursor:pointer;
     }
     #container-${uid}:hover{
          background-image: linear-gradient(to right, ${color.darker}, ${color.normal});
          transform: scale(1.05);
     }
     #note-preview-${uid}{
          
     }
     #note-title-${uid}{
          margin:0px;
          flex-direction: row;
          flex-wrap:wrap;
          justify-content:flex-start;
          align-items: center;
     }
     #note-content-${uid}{
          margin-top:10px;
          padding-top:5px;
          text-overflow: ellipsis;
          display: flex;
          flex-grow:1;
          flex-direction: column;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 6; /* number of lines to show */
          -webkit-box-orient: vertical;
     }
     #note-card-icons-${uid}{
          height:25px;
          width:25px;
          filter: invert(100);
          padding:5px;
          opcaity:0.5;
          border: 1px solid transparent;
     }
     #note-card-icons-${uid}:hover{
          border: 1px solid ${color.darker};
          border-radius:10px;0;
     }
     .more-options-${uid}{
          display:flex;
          padding:5px;
          border-radius:10px;
          flex-direction: row;
          position:sticky;
          justify-content: flex-end;
          margin-top:auto;
     }
     `;

     return (
          <div id={`container-${uid}`} onClick={props.onClick}>
               <style>{style}</style>

               <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <div id={`note-preview-${uid}`}>
                         <h3 id={`note-title-${uid}`}>{title}</h3>
                         {confirm ? (
                              <div>
                                   <p>Are you sure you want to delete this note?</p>
                                   <div>
                                        <button
                                             onClick={(e) => {
                                                  props.erase();
                                                  e.stopPropagation();
                                             }}
                                        >
                                             confirm
                                        </button>
                                        <button
                                             onClick={(e) => {
                                                  setConfirm(false);
                                                  e.stopPropagation();
                                             }}
                                        >
                                             cancel
                                        </button>
                                   </div>
                              </div>
                         ) : uid.split("")[0] === "T" ? (
                              <p id={`note-content-${uid}`}>{content.toString()}</p>
                         ) : (
                              <div id={`note-content-${uid}`}>
                                   {content.map((item) => (
                                        <div style={{ marginBottom: "10px" }}>
                                             <img
                                                  src={item.doneDate === -1 ? uncheck : check}
                                                  height={"15px"}
                                                  width={"15px"}
                                                  alt="item"
                                                  style={{
                                                       marginRight: "5px",
                                                       filter: "invert(100)",
                                                       zIndex: 0,
                                                  }}
                                             />
                                             {item.description}
                                        </div>
                                   ))}
                              </div>
                         )}
                    </div>
                    <div className={`more-options-${uid}`}>
                         <img
                              src={paint}
                              alt="change color"
                              id={`note-card-icons-${uid}`}
                              onClick={(e) => {
                                   if (confirm) setConfirm(false);
                                   props.onPaint();
                                   e.stopPropagation();
                              }}
                         />
                         <img
                              src={trash}
                              alt="delete"
                              id={`note-card-icons-${uid}`}
                              onClick={(e) => {
                                   setConfirm(true);
                                   e.stopPropagation();
                              }}
                         />
                    </div>
               </div>
          </div>
     );
};

export default NoteCard;

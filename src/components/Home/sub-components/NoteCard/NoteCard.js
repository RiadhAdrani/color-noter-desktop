import Theme from "../../../../models/Theme";
import check from "../../../../assets/check-box.svg";
import uncheck from "../../../../assets/uncheck-box.svg";

const NoteCard = (props) => {
     const uid = props.note.uid;
     const title = props.note.title;
     const content = props.note.content;
     const color = props.note.color ? Theme[props.note.color] : Theme[0];

     // console.log(props.note.color);

     const style = `
     #container-${uid}{
          display: flex;
          flex-direction:column;
          margin-bottom:30px;
          height:250px;
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
     }
     #note-preview-${uid}{
          
     }
     #note-title-${uid}{
          margin:0px;
     }
     #note-content-${uid}{
          margin-top:10px;
          padding-top:5px;
          text-overflow: ellipsis;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 7; /* number of lines to show */
          -webkit-box-orient: vertical;
     }
     `;

     return (
          <div id={`container-${uid}`} onClick={props.onClick}>
               <style>{style}</style>
               <div id={`note-preview-${uid}`}>
                    <h3 id={`note-title-${uid}`}>{title}</h3>
                    {uid.split("")[0] === "T" ? (
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
          </div>
     );
};

export default NoteCard;

import Theme from "../../../../models/Theme";

const NoteCard = (props) => {
     const uid = props.note.uid;
     const title = props.note.title;
     const content = props.note.content;
     const color = props.note.color ? Theme[props.note.color] : Theme[0];

     const style = `
     #container-${uid}{
          display: flex;
          flex-direction:column;
          margin: 0px 15px 10px 15px;
          height:100px;
          background-color: ${color.dark};
          border-radius: 10px;
          padding:15px;
          transition-duration: 0.15s;
          overflow: hidden;
     }
     #container-${uid}:hover{
          background-color: ${color.darker};
     }
     #note-preview-${uid}{
          
     }
     #note-title-${uid}{
          margin:0px;
     }
     #note-content-${uid}{
          margin:0px;
     }
     `;

     return (
          <div id={`container-${uid}`}>
               <style>{style}</style>
               <div id={`note-preview-${uid}`}>
                    <h3 id={`note-title-${uid}`}>{title}</h3>
                    <p id={`note-content-${uid}`}>{content.toString()}</p>
               </div>
          </div>
     );
};

export default NoteCard;

import Theme from "../../../../models/Theme";

const NoteCard = (props) => {
     console.log(props.note);

     const uid = props.note.uid;
     const title = props.note.title;
     const content = props.note.content;
     const color = props.note.color ? Theme[props.note.color] : Theme[0];
     console.log(color);

     const style = `
     #container-${uid}{
          display: flex;
          flex-direction:column;
          margin: 10px 10px 10px 10px;
          height:200px;
          width:200px;
          background-image: linear-gradient(to right, ${color.dark}, ${color.normal});
          border-radius: 10px;
          padding:15px;
          float: left;
          justify-content:start;
          transition-duration: 0.15s;
          overflow: hidden;
          transition-duration:0.2s;
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
          margin:0px;
          padding-top:5px;
          text-overflow: ellipsis;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5; /* number of lines to show */
          -webkit-box-orient: vertical;
     }
     `;

     return (
          <div id={`container-${uid}`} onClick={props.onClick}>
               <style>{style}</style>
               <div id={`note-preview-${uid}`}>
                    <h3 id={`note-title-${uid}`}>{title}</h3>
                    <p id={`note-content-${uid}`}>{content.toString()}</p>
               </div>
          </div>
     );
};

export default NoteCard;

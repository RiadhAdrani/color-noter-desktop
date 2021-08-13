import Theme from "../../../models/Theme";

const EditNote = (props) => {
     const theme = Theme[props.edit.color ? props.edit.color : props.database.color];

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
          margin-bottom:20px;
          
     }
     ::placeholder{
          color:grey;
     }
     #content-box{
          flex-grow:1;
          text-align: start; 
          padding:10px;
          font-family:inherit;
     }
     .edit-buttons{
          background-color: ${theme.dark};
          color:white;
          padding:10px;
          margin-left:10px;
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
     `;
     return (
          <div id="edit-note-popup">
               <style>{style}</style>
               <div id="container">
                    <input id="title-box" type="text" placeholder="title" />
                    <textarea
                         id="content-box"
                         type="text"
                         placeholder="what's in your mind today?"
                    />
                    <div id="buttons-container">
                         <button className="edit-buttons">Save</button>
                         <button
                              className="edit-buttons"
                              onClick={() => {
                                   props.trigger();
                              }}
                         >
                              Return
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default EditNote;

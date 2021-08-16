import Theme from "../../../models/Theme";
import del from "../../../assets/trash.svg";

const Todo = (props) => {
     const todo = props.todo;
     const color = Theme[props.color];

     const style = `

     .todo-${todo.uid}{
          background-color:${color.dark};
          color:white;
          margin-bottom:10px;
          padding:15px;
          border-radius:5px;
          display:flex;
          flex-direction:row;
          align-items:center;
     }

     .todo-check-${todo.uid}{
          margin-right:30px;
          transform:scale(2);
          font-size:1.05em;
          
     }
     .delete-item:hover{
          background-color: ${color.darker};
     }
     .input-box{
          flex:1;
          margin-right:10px;
          padding:5px;
          font-family:inherit;
          font-size:1.1em;
          
     }
     #input-box-${props.content[props.index].uid}{
          text-decoration:${props.content[props.index].doneDate !== -1 ? " line-through" : "none"};
     }
     `;

     return (
          <div className={`todo-${todo.uid}`}>
               <input
                    type="checkbox"
                    className={`todo-check-${todo.uid}`}
                    name={props.content[props.index].uid}
                    id={`to-do-item-${props.content[props.index].id}`}
                    defaultChecked={props.content[props.index].doneDate !== -1}
                    onChange={(bool) => {
                         const doneDate = bool.target.checked ? new Date().getTime() : -1;
                         const newValue = {
                              ...props.content[props.index],
                              doneDate: doneDate,
                         };

                         props.setContent([
                              ...props.content.slice(0, props.index),
                              newValue,
                              ...props.content.slice(props.index + 1),
                         ]);
                    }}
               />
               <style>{style}</style>
               <input
                    type="text"
                    value={props.content[props.index].description}
                    className={"input-box"}
                    maxLength={75}
                    disabled={todo.doneDate > -1}
                    id={`input-box-${props.content[props.index].uid}`}
                    onChange={(e) => {
                         const newValue = {
                              ...props.content[props.index],
                              description: e.target.value,
                         };

                         props.setContent([
                              ...props.content.slice(0, props.index),
                              newValue,
                              ...props.content.slice(props.index + 1),
                         ]);
                    }}
               />
               <div
                    onClick={() =>
                         props.setContent(props.content.filter((e) => e.uid !== todo.uid))
                    }
                    className="delete-item"
                    style={{
                         padding: "10px",
                         marginLeft: "auto",
                         borderRadius: "5px",
                    }}
               >
                    <img
                         src={del}
                         alt="delete"
                         height="20px"
                         style={{
                              filter: "invert(100)",
                         }}
                    />
               </div>
          </div>
     );
};

export default Todo;

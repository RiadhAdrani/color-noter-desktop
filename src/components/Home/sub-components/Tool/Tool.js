import "./Tool.css";

const Tool = (props) => {
     const icon = props.icon;
     const name = props.name;
     const onClick = props.onClick;

     return (
          <div id="icon-box" onClick={onClick}>
               <img id="icon" src={icon} onClick={onClick} alt={name} />
               <p id="label">{name}</p>
          </div>
     );
};

export default Tool;

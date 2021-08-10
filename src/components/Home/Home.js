import "./Home.css";
import Theme from "../../models/Theme";
import Tool from "./sub-components/Tool/Tool";
import search from "../../assets/search.svg";
import sort from "../../assets/sort.svg";
import trash from "../../assets/trash.svg";
import select from "../../assets/check-square.svg";
import NoteCard from "./sub-components/NoteCard/NoteCard";

const Home = (props) => {
     const database = props.database;
     const theme = Theme[database.color];

     return (
          <div id="home-container">
               <p
                    id="home-title"
                    style={{
                         backgroundImage: `linear-gradient(to right, ${theme.dark}, ${theme.darker})`,
                    }}
               >
                    Welcome back {database.username}!
               </p>
               <div id="tool-bar">
                    <Tool icon={search} name={"Search"} onClick={() => {}} />
                    <Tool icon={select} name={"Select"} onClick={() => {}} />
                    <Tool icon={sort} name={"Sort"} onClick={() => {}} />
                    <Tool icon={trash} name={"Delete"} onClick={() => {}} />
               </div>
               <div id="notes-list">
                    {database.notes.map((e) => {
                         console.log(e, "");
                         return <NoteCard note={e} key={e.uid} />;
                    })}
               </div>
          </div>
     );
};

export default Home;

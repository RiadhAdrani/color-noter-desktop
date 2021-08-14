import "./Home.css";
import Theme from "../../models/Theme";
import Tool from "./sub-components/Tool/Tool";
import search from "../../assets/search.svg";
import sort from "../../assets/sort.svg";
import trash from "../../assets/trash.svg";
import select from "../../assets/check-square.svg";
import plus from "../../assets/plus.svg";
import NoteCard from "./sub-components/NoteCard/NoteCard";
import Note from "../../models/Note";

const Home = (props) => {
     const database = props.database;
     const theme = Theme[database.color];

     return (
          <div id="home-container">
               <div
                    id="sticky-top"
                    style={{
                         backgroundImage: `linear-gradient(to right, ${theme.dark}, ${theme.darker})`,
                    }}
               >
                    <p id="home-title">Welcome back {database.id} !</p>
                    <div id="tool-bar">
                         <Tool icon={search} name={"Search"} onClick={() => {}} />
                         <Tool icon={select} name={"Select"} onClick={() => {}} />
                         <Tool icon={sort} name={"Sort"} onClick={() => {}} />
                         <Tool icon={trash} name={"Delete"} onClick={() => {}} />
                    </div>
               </div>

               <div id="notes-list">
                    {database.notes.map((e) => {
                         return (
                              <NoteCard
                                   note={e}
                                   key={e.uid}
                                   onClick={() => {
                                        props.trigger(e);
                                   }}
                              />
                         );
                    })}
               </div>
               <div
                    onClick={() => {
                         props.trigger(new Note({}));
                    }}
                    style={{
                         position: "absolute",
                         bottom: "40px",
                         right: "100px",
                         padding: "22px",
                         backgroundColor: theme.dark,
                         borderRadius: "50%",
                         cursor: "pointer",
                    }}
               >
                    <img
                         src={plus}
                         alt="Add"
                         height={"20px"}
                         id="floating-button"
                         style={{
                              filter: "invert(100)",
                         }}
                    />
               </div>
          </div>
     );
};

export default Home;

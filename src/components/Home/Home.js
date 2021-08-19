import "./Home.css";
import Theme from "../../models/Theme";
import Tool from "./sub-components/Tool/Tool";
import search from "../../assets/search.svg";
import sort from "../../assets/sort.svg";
import select from "../../assets/check-square.svg";
import paragraph from "../../assets/paragraph.svg";
import NoteCard from "./sub-components/NoteCard/NoteCard";
import Note from "../../models/Note";

const Home = (props) => {
     const theme = Theme[props.database.color];

     return (
          <div id="home-container">
               <div
                    id="sticky-top"
                    style={{
                         backgroundImage: `linear-gradient(to right, ${theme.dark}, ${theme.darker})`,
                    }}
               >
                    <p id="home-title">Welcome back {props.database.id} !</p>
                    <div id="tool-bar">
                         <Tool icon={search} name={"Search"} onClick={() => {}} />
                         <Tool icon={sort} name={"Sort"} onClick={() => {}} />
                    </div>
               </div>

               <div id="notes-list">
                    {props.database.notes.map((e) => {
                         return (
                              <NoteCard
                                   note={e}
                                   key={e.uid}
                                   onClick={() => {
                                        props.trigger(e);
                                   }}
                                   erase={() => {
                                        props.delete(e.uid);
                                   }}
                                   onPaint={() => {
                                        props.setColorWindow({
                                             show: true,
                                             color: e.color,
                                             onSelect: (color) => {
                                                  props.database.notes.forEach((note) => {
                                                       if (note.uid === e.uid) {
                                                            note.color = color;
                                                            return;
                                                       }
                                                  });
                                             },
                                        });
                                   }}
                              />
                         );
                    })}
               </div>
               <div
                    style={{
                         position: "absolute",
                         bottom: "40px",
                         right: "100px",
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         alignItems: "center",
                    }}
               >
                    <div
                         className="floating-button"
                         onClick={() => {
                              props.trigger(Note.newToDo(props.database.color));
                         }}
                         style={{
                              padding: "20px",
                              backgroundColor: theme.dark,
                              borderRadius: "50%",
                              cursor: "pointer",
                              marginBottom: "10px",
                         }}
                    >
                         <img
                              src={select}
                              alt="Add"
                              height={"25px"}
                              width={"25px"}
                              id="floating-button"
                              style={{
                                   filter: "invert(100)",
                              }}
                         />
                    </div>
                    <div
                         className="floating-button"
                         onClick={() => {
                              props.trigger(Note.newTextNote(props.database.color));
                         }}
                         style={{
                              padding: "20px",
                              backgroundColor: theme.dark,
                              borderRadius: "50%",
                              cursor: "pointer",
                         }}
                    >
                         <img
                              src={paragraph}
                              alt="Add"
                              height={"25px"}
                              width={"25px"}
                              id="floating-button"
                              style={{
                                   filter: "invert(100)",
                              }}
                         />
                    </div>
               </div>
          </div>
     );
};

export default Home;

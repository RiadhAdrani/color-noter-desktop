import { v4 as uuid } from "uuid";

class Note {
     constructor({
          color = 0,
          content = "",
          creationDate = new Date().getTime(),
          modificationDate = new Date().getTime(),
          title = "Note",
          uid = `C${uuid()}-${new Date().getTime()}`,
     }) {
          this.color = color;
          this.creationDate = creationDate ? creationDate : new Date().getTime();
          this.modificationDate = modificationDate ? modificationDate : new Date().getTime();
          this.title = title;
          this.uid = uid;
          this.content = content ? content : this.uid.split("")[0] === "C" ? [] : "";
     }

     toJSON() {
          return {
               color: this.color,
               content: this.content,
               creationDate: this.creationDate,
               modificationDate: this.modificationDate,
               title: this.title,
               uid: this.uid,
          };
     }

     static newTextNote(color) {
          return new Note({ uid: `T${uuid()}-${new Date().getTime()}`, content: "", color: color });
     }

     static newToDo(color) {
          return new Note({ uid: `C${uuid()}-${new Date().getTime()}`, content: [], color: color });
     }
}

export default Note;

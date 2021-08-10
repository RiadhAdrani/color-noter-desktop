import { v4 as uuid } from "uuid";

class Note {
     constructor({
          color = 0,
          content = "",
          creationDate = undefined,
          modificationDate = undefined,
          title = "Note",
          uid = uuid(),
     }) {
          this.color = color;
          this.content = content;
          this.creationDate = creationDate ? creationDate : new Date().getTime();
          this.modificationDate = modificationDate ? modificationDate : new Date().getTime();
          this.title = title;
          this.uid = uid;
     }
}

export default Note;

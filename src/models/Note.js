import { v4 as uuid } from "uuid";

class Note {
     constructor({
          color = 0,
          content = "",
          creationDate = undefined,
          modificationDate = undefined,
          title = "Note",
          uid = `C${uuid()}-${new Date().getTime()}}`,
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
}

export default Note;

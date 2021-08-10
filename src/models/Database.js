import firebase from "firebase";
import Note from "./Note";

const firebaseConfig = {
     apiKey: "AIzaSyAvw2rOiIFFTnfCmwcy_13jq3QRPTUNj3M",
     authDomain: "color-noter.firebaseapp.com",
     databaseURL: "https://color-noter-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "color-noter",
     storageBucket: "color-noter.appspot.com",
     messagingSenderId: "12057113157",
     appId: "1:12057113157:web:1169b298506d5b66cbe92c",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

class Database {
     constructor({ email, id, lastSync, password, color, theme, notes }) {
          this.email = email ? email : "";
          this.id = id ? id : "";
          this.lastSync = lastSync ? lastSync : "";
          this.password = password ? password : "";
          this.color = color ? color : 0;
          this.theme = theme ? theme : 0;
          this.notes = notes ? notes : [];
     }

     async getNotes() {
          const data = await db
               .collection("users")
               .doc("AoNWSxy0nXVoyslew7hI")
               .collection("user_notes")
               .get();

          data.docs.forEach((n) => {
               const note = n.data();
               this.notes.push(
                    new Note({
                         color: note.color,
                         creationDate: note.creationDate,
                         modificationDate: note.modificationDate,
                         title: note.title,
                         uid: note.uid,
                         content: note.content,
                    })
               );
          });

          return true;
     }

     async getData() {
          const base = await db.collection("users").doc("AoNWSxy0nXVoyslew7hI").get();
          const data = base.data();
          this.email = data.email;
          this.lastSync = data.last_sync;
          this.id = data.id;
          this.password = data.password;
          this.theme = data.user_theme;
          this.color = data.user_color;
          this.notes = [];
          return true;
     }

     async retrieveUserData(onSynced = () => {}) {
          return Promise.all([this.getData(), this.getNotes()]).then((values) => {
               console.log(values);
               onSynced();
          });
     }
}

export default Database;

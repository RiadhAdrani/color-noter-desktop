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

     async retrieveUserData(onSynced = () => {}, onFailed = () => {}) {
          return Promise.all([this.getData(), this.getNotes()]).then(() => {
               onSynced();
          });
     }

     static async upload(dataObject) {
          let userUUID = null;
          (await db.collection("users").get()).docs.forEach((user) => {
               if (user.data().id === dataObject.id) {
                    userUUID = user.id;
               }
          });
          if (userUUID) {
               await db.collection("users").doc(userUUID).update({
                    email: dataObject.email,
                    id: dataObject.id,
                    last_sync: dataObject.lastSync,
                    password: dataObject.password,
                    user_color: dataObject.color,
                    user_theme: dataObject.theme,
               });

               const user_notes = await db
                    .collection("users")
                    .doc(userUUID)
                    .collection("user_notes");

               const notesUUID = (await user_notes.get()).docs.map((e) => e.id);
               notesUUID.forEach((noteUID) => {
                    user_notes.doc(noteUID).delete();
               });

               const newNotes = dataObject.notes.map((note) => {
                    return {
                         color: note.color,
                         content: note.content,
                         creationDate: note.creationDate,
                         modificationDate: note.modificationDate,
                         title: note.title,
                         uid: note.uid,
                    };
               });

               newNotes.forEach((note) => {
                    user_notes.doc(note.uid).set(note);
               });
          } else return true;
     }

     static async updateCloudDatabaseInfo(newData) {
          const users = await db.collection("users").get();
          users.docs.forEach((user) => {
               if (user.data().id === newData.id) {
                    const info = {
                         email: newData.email,
                         id: newData.id,
                         last_sync: newData.lastSync,
                         password: newData.password,
                         user_color: newData.color,
                         user_theme: newData.theme,
                    };
                    console.log(info);
                    return true;
               }
          });
     }

     static async updateCloudDatabaseNotes(newNotes) {
          console.log(newNotes);
          return true;
     }

     static async updateCloud(db, onSynced = () => {}) {
          return Promise.all([
               Database.updateCloudDatabaseInfo(db),
               Database.updateCloudDatabaseNotes(db.notes),
          ]).then(() => {
               onSynced();
          });
     }
}

export default Database;

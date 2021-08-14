import { v4 } from "uuid";

const ToDo = ({
     creationDate,
     description = "new to do",
     doneDate = -1,
     dueDate,
     modificationDate,
     priority = "LOW",
     uid,
}) => {
     return {
          creationDate: creationDate ? creationDate : new Date().getTime(),
          description: description,
          doneDate: doneDate,
          dueDate: dueDate,
          modificationDate: modificationDate,
          priority: priority,
          uid: uid ? uid : `${v4()}${new Date().getTime()}${v4()}`,
     };
};

export default ToDo;

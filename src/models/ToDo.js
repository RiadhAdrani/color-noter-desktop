import { v4 } from "uuid";

const ToDo = ({
     creationDate = new Date().getTime(),
     description = "new to do",
     doneDate = -1,
     dueDate = -1,
     modificationDate = new Date().getTime(),
     priority = "LOW",
     uid,
}) => {
     return {
          creationDate: creationDate,
          description: description,
          doneDate: doneDate,
          dueDate: dueDate,
          modificationDate: modificationDate,
          priority: priority,
          uid: uid ? uid : `${v4()}${new Date().getTime()}${v4()}`,
     };
};

export default ToDo;

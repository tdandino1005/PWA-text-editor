import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

  // Export the db functions.
export const putDb = async (content) => {
  // Created a connection to db.
  const jateDb = await openDB("jate", 1);

  // Created a new transacation.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the object store.
  const store = tx.objectStore("jate");

  // Use put() method to add data to the database.
  const request = store.put({ id: 1, value: content });

  // Get result of the request.
  const result = await request;
  console.log("saved to the database!", result);
};

export const getDb = async () => {
  // Create a connection to the database.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the object store.
  const store = tx.objectStore("jate");

  // Get all the data from the object store.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
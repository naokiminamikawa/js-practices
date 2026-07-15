import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve(this);
    });
  });
}

run(
  db,
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
)
  .then(() => run(db, "INSERT INTO users (name) VALUES (?)", [null]))
  .catch((error) => {
    console.error(`Insert error: ${error.message}`);
  })
  .then(() => get(db, "SELECT * FROM invalid_table"))
  .catch((error) => {
    console.error(`Select error: ${error.message}`);
  })
  .then(() => run(db, "DROP TABLE users"))
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    db.close();
  });

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

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

run(
  db,
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
)
  .then(() => run(db, "INSERT INTO users (name) VALUES (?)", ["Alice"]))
  .then((result) => {
    const insertedId = result.lastID;
    console.log(`Inserted ID: ${insertedId}`);

    return get(db, "SELECT * FROM users WHERE id = ?", [insertedId]);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    db.close();
  });

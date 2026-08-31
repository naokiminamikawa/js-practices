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

async function main() {
  try {
    await run(
      db,
      "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
    );
    const result = await run(db, "INSERT INTO users (name) VALUES (?)", [
      "Alice",
    ]);
    const insertedId = result.lastID;
    console.log(`Inserted ID: ${insertedId}`);

    const row = await get(db, "SELECT * FROM users WHERE id = ?", [insertedId]);
    console.log(row);

    await run(db, "DROP TABLE users");
  } catch (error) {
    console.error(error.message);
  } finally {
    db.close();
  }
}

main();

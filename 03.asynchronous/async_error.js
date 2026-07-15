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

    try {
      await run(db, "INSERT INTO users (name) VALUES (?)", [null]);
    } catch (error) {
      console.error(`Insert error: ${error.message}`);
    }

    try {
      await get(db, "SELECT * FROM invalid_table");
    } catch (error) {
      console.error(`Select error: ${error.message}`);
    }

    await run(db, "DROP TABLE users");
  } catch (error) {
    console.error(error.message);
  } finally {
    db.close();
  }
}

main();

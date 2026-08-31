import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
    (error) => {
      if (error) {
        console.error(error.message);
        return;
      }

      db.run("INSERT INTO users (name) VALUES (?)", [null], (error) => {
        if (error) {
          console.error(`Insert error: ${error.message}`);
        }

        db.get("SELECT * FROM invalid_table", (error, row) => {
          if (error) {
            console.error(`Select error: ${error.message}`);
          } else {
            console.log(row);
          }

          db.run("DROP TABLE users", (error) => {
            if (error) {
              console.error(error.message);
            }

            db.close();
          });
        });
      });
    },
  );
});

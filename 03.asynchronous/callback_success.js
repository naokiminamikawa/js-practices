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

      db.run(
        "INSERT INTO users (name) VALUES (?)",
        ["Alice"],
        function (error) {
          if (error) {
            console.error(error.message);
            return;
          }

          const insertedId = this.lastID;

          console.log(`Inserted ID: ${insertedId}`);

          db.get(
            "SELECT * FROM users WHERE id = ?",
            [insertedId],
            (error, row) => {
              if (error) {
                console.error(error.message);
                return;
              }

              console.log(row);

              db.run("DROP TABLE users", (error) => {
                if (error) {
                  console.error(error.message);
                }

                db.close();
              });
            },
          );
        },
      );
    },
  );
});

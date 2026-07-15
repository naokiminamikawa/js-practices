#!/usr/bin/env node

const args = process.argv.slice(2);
let year, month;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "-y") {
    year = parseInt(args[i + 1], 10);
  }
  if (args[i] === "-m") {
    month = parseInt(args[i + 1], 10);
  }
}

const today = new Date();
year = year || today.getFullYear();
month = month || today.getMonth() + 1;

function cal(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const spaces = "   ".repeat(firstDate.getDay());
  process.stdout.write(spaces);

  for (let date = 1; date <= lastDate.getDate(); date++) {
    const current = new Date(year, month - 1, date);
    process.stdout.write(`${date.toString().padStart(2, " ")} `);

    if (current.getDay() === 6 || date === lastDate.getDate()) {
      process.stdout.write("\n");
    }
  }
}

cal(year, month);

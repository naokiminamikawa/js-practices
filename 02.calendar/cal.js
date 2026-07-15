#!/usr/bin/env node

function cal(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const spaces = "   ".repeat(firstDate.getDay());
  process.stdout.write(spaces);

  for (
    let current = new Date(year, month - 1, 1);
    current.getMonth() === month - 1;
    current.setDate(current.getDate() + 1)
  ) {
    const date = current.getDate();
    process.stdout.write(`${date.toString().padStart(2, " ")} `);

    if (current.getDay() === 6 || date === lastDate.getDate()) {
      process.stdout.write("\n");
    }
  }
}

const args = process.argv.slice(2);
let c_year, c_month;

// コマンドライン引数解析
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-y") {
    c_year = parseInt(args[i + 1], 10);
  }
  if (args[i] === "-m") {
    c_month = parseInt(args[i + 1], 10);
  }
}

// デフォルト値設定
const today = new Date();
let d_year, d_month;
d_year = c_year || today.getFullYear();
d_month = c_month || today.getMonth() + 1;

cal(d_year, d_month);

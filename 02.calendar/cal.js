#!/usr/bin/env node

const args = process.argv.slice(2);
let year, month;

// コマンドライン引数の解析
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-y") {
    year = parseInt(args[i + 1], 10);
  }
  if (args[i] === "-m") {
    month = parseInt(args[i + 1], 10);
  }
}

// デフォルト値
const today = new Date();
year = year || today.getFullYear();
month = month || today.getMonth() + 1;

// カレンダー表示関数
function cal(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  // 曜日位置の空白
  let spaces = "   ".repeat(firstDate.getDay());
  process.stdout.write(spaces);

  for (let date = 1; date <= lastDate.getDate(); date++) {
    const current = new Date(year, month - 1, date);
    process.stdout.write(date.toString().padStart(2, " ") + " ");

    // 土曜日なら改行
    if (current.getDay() === 6) {
      process.stdout.write("\n");
    }
  }

  // 最終日が土曜でない場合は改行
  if (lastDate.getDay() !== 6) {
    process.stdout.write("\n");
  }
}

// 実行
cal(year, month);

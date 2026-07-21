#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import { select } from "@inquirer/prompts";
import MemoManager from "./memo_manager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoFilePath = path.join(__dirname, "memo.json");

const memoManager = new MemoManager(memoFilePath);

const command = process.argv[2];

async function readStdin() {
  let input = "";

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  return input.trimEnd();
}

function buildChoices(memos) {
  return memos.map((memo, index) => ({
    name: memoManager.firstLine(memo),
    value: index,
  }));
}

async function addMemo() {
  const content = await readStdin();

  if (content === "") {
    console.log("メモ内容を入力してください");
    process.exit(1);
  }

  memoManager.add(content);
}

function listMemos() {
  const memos = memoManager.list();

  memos.forEach((memo) => {
    console.log(memoManager.firstLine(memo));
  });
}

async function showMemo() {
  if (memoManager.isEmpty()) {
    console.log("メモがありません");
    return;
  }

  const memos = memoManager.list();

  const selectedIndex = await select({
    message: "Choose a note you want to see:",
    choices: buildChoices(memos),
  });

  console.log("");
  console.log(memoManager.find(selectedIndex));
}

async function deleteMemo() {
  if (memoManager.isEmpty()) {
    console.log("メモがありません");
    return;
  }

  const memos = memoManager.list();

  const selectedIndex = await select({
    message: "Choose a memo you want to delete:",
    choices: buildChoices(memos),
  });

  memoManager.delete(selectedIndex);

  console.log("削除しました");
}

switch (command) {
  case undefined:
    await addMemo();
    break;

  case "-l":
    listMemos();
    break;

  case "-r":
    await showMemo();
    break;

  case "-d":
    await deleteMemo();
    break;

  default:
    console.log(`
使い方:
  ./memo.js
  ./memo.js -l
  ./memo.js -r
  ./memo.js -d
`);
}

#!/usr/bin/env node

import { Scale } from "../src/scale.js";

const root = process.argv[2];
const type = process.argv[3];

if (!root || !type) {
  console.log("使い方: guitar-scale <root> <major|minor>");
  process.exit(1);
}

const scale = new Scale(root, type);

const notes = scale.notes();

if (!notes) {
  console.log("未対応のスケールです");
  process.exit(1);
}

console.log(`${root} ${type}`);
console.log("");
console.log(notes.join(" "));

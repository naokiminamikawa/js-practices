import fs from "fs";

export default class MemoManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  load() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "[]");
    }

    const json = fs.readFileSync(this.filePath, "utf8");

    if (json.trim() === "") {
      return [];
    }

    return JSON.parse(json);
  }

  save(memos) {
    fs.writeFileSync(this.filePath, JSON.stringify(memos, null, 2));
  }

  add(content) {
    const memos = this.load();
    memos.push(content);
    this.save(memos);
  }

  list() {
    return this.load();
  }

  firstLine(memo) {
    return memo.split("\n")[0];
  }

  find(index) {
    const memos = this.load();
    return memos[index];
  }

  delete(index) {
    const memos = this.load();

    memos.splice(index, 1);

    this.save(memos);
  }

  isEmpty() {
    return this.load().length === 0;
  }
}

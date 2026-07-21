import { NOTES } from "./notes.js";

const INTERVALS = {
  major: [2, 2, 1, 2, 2, 2],
  minor: [2, 1, 2, 2, 1, 2],
};

export class Scale {
  constructor(root, type) {
    this.root = root;
    this.type = type;
  }

  notes() {
    const rootIndex = NOTES.indexOf(this.root);

    if (rootIndex === -1) {
      return null;
    }

    const intervals = INTERVALS[this.type];

    if (!intervals) {
      return null;
    }

    const result = [this.root];
    let currentIndex = rootIndex;

    intervals.forEach((interval) => {
      currentIndex = (currentIndex + interval) % NOTES.length;
      result.push(NOTES[currentIndex]);
    });

    return result;
  }
}

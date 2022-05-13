import { readData, timeDiffCalc, writeCsvArray } from "./tools";

const data = readData();

for (const pr of data) {
  if (pr.merged_at) {
    // Exclude PR's that were never merged with a value of null.
    const creationDate = new Date(pr.created_at).getTime();
    const mergedDate = new Date(pr.merged_at).getTime();
    const timeDiff = mergedDate - creationDate;
    const timeArray: number[] = timeDiffCalc(timeDiff);
    writeCsvArray(timeArray);
  }
}

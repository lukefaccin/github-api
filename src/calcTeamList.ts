import { readData, writeCsvArray } from "./tools";

const data = readData();

for (const team of data) {
    console.log(team.slug)
    writeCsvArray([team.slug]);
}

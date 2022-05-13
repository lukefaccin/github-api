import fs from "fs";
import octokit from "./tools";

const repoOwner = process.env.GITHUB_REPO_OWNER;

async function getData() {
  const result = octokit.paginate("GET /orgs/{org}/teams", {
    org: repoOwner,
    per_page: 100,
  });
  return result;
}

getData().then((data) => {
  try {
    fs.readdirSync("./output");
  } catch (err) {
    fs.mkdirSync("./output");
  }
  try {
    fs.readFileSync("./output/data.json");
  } catch (err) {
    fs.writeFileSync("./output/data.json", "");
  }
  fs.appendFile("./output/data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

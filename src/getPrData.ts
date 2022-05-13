import fs from "fs";
import octokit from "./tools";

const repoOwner = process.env.GITHUB_REPO_OWNER;
const repoName = process.env.GITHUB_REPO_NAME;

async function getData() {
  const result = octokit.paginate("GET /repos/{owner}/{repo}/pulls", {
    owner: repoOwner,
    repo: repoName,
    per_page: 100,
    state: "closed",
  });
  return result;
}

getData().then((data) => {
  console.log(data);
  fs.appendFile("./output/data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

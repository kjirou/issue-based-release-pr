const core = require("@actions/core");
// TODO: It's for development, so it's excluded from the build target.
const parseArgs = require("minimist");

const { main } = require("../lib/main");

const commandArgs = parseArgs(process.argv.slice(2));
const baseBranchName =
  core.getInput("base-branch-name") || commandArgs["base-branch-name"] || "";
const githubToken =
  core.getInput("github-token") || commandArgs["github-token"] || "";
const rawRepo = core.getInput("repo") || commandArgs.repo || "";

(async () => {
  try {
    await main({ baseBranchName, githubToken, rawRepo });
  } catch (error) {
    core.setFailed(error.message);
  }
})();

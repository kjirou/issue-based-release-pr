const core = require('@actions/core');

try {
  console.log("Start the core process of issue-based-release-pr.");
  const baseBranchName = core.getInput('base-branch-name');
  console.log(`Hello ${baseBranchName}!`);
  throw new Error('ERROOOORR!!!!!');
  console.log("Complete the core process of issue-based-release-pr.");
} catch (error) {
  core.setFailed(error.message);
}

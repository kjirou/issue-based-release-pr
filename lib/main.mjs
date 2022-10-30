import github from "@actions/github";

/**
 * @param {object} params
 * @param {string} [params.baseBranchName]
 * @param {string} [params.githubToken]
 * @return void
 */
export const main = async (params) => {
  const {
    baseBranchName,
    githubToken,
  } = params;
  const octokit = github.getOctokit(githubToken);
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: 'kjirou',
    repo: 'issue-based-release-pr',
    pull_number: 1,
    mediaType: {
      format: 'diff'
    }
  });
  console.log("main.js here!");
  console.log("baseBranchName", baseBranchName);
  console.log(pullRequest);
};

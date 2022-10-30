"use strict";
exports.id = 8;
exports.ids = [8];
exports.modules = {

/***/ 9008:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5438);


/**
 * @param {object} params
 * @param {string} [params.baseBranchName]
 * @param {string} [params.githubToken]
 * @param {string} [params.rawRepo]
 * @return void
 */
const main = async (params) => {
  const { baseBranchName, githubToken, rawRepo } = params;
  let owner = "";
  let repo = "";
  if (rawRepo !== "") {
    [owner, repo] = rawRepo.split("/");
  } else {
    // NOTE: GITHUB_REPOSITORY 環境変数がない状況で `github.context.repo` を呼び出すとエラーになる。
    //       https://github.com/actions/toolkit/blob/2b97eb3192ed27ad81a555e87f3f9de61c11a213/packages/github/src/context.ts#L64-L79
    try {
      owner = _actions_github__WEBPACK_IMPORTED_MODULE_0__.context.repo.owner;
      repo = _actions_github__WEBPACK_IMPORTED_MODULE_0__.context.repo.repo;
    } catch (error) {
      if (/a GITHUB_REPOSITORY environment/.test(error.message)) {
        [owner, repo] = rawRepo.split("/");
      } else {
        throw error;
      }
    }
  }
  const octokit = _actions_github__WEBPACK_IMPORTED_MODULE_0__.getOctokit(githubToken);
  const result = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "closed",
  });
  console.log("main.js here!");
  console.log("baseBranchName", baseBranchName);
  console.log(result);
};


/***/ })

};
;
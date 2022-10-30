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
 * @return void
 */
const main = async (params) => {
  const {
    baseBranchName,
    githubToken,
  } = params;
  const octokit = _actions_github__WEBPACK_IMPORTED_MODULE_0__.getOctokit(githubToken);
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


/***/ })

};
;
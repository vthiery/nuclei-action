/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 875:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 889:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 231:
/***/ ((module) => {

module.exports = eval("require")("@actions/tool-cache");


/***/ }),

/***/ 668:
/***/ ((module) => {

module.exports = eval("require")("js-yaml");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../../../../../.asdf/installs/nodejs/22.2.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/core
var core = __nccwpck_require__(875);
// EXTERNAL MODULE: ../../../../../.asdf/installs/nodejs/22.2.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/exec
var exec = __nccwpck_require__(889);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__nccwpck_require__.n(external_fs_namespaceObject);
;// CONCATENATED MODULE: external "https"
const external_https_namespaceObject = require("https");
var external_https_default = /*#__PURE__*/__nccwpck_require__.n(external_https_namespaceObject);
;// CONCATENATED MODULE: external "os"
const external_os_namespaceObject = require("os");
var external_os_default = /*#__PURE__*/__nccwpck_require__.n(external_os_namespaceObject);
// EXTERNAL MODULE: ../../../../../.asdf/installs/nodejs/22.2.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/tool-cache
var tool_cache = __nccwpck_require__(231);
;// CONCATENATED MODULE: ./src/installer.js






const ROOT_URL = "https://github.com/projectdiscovery/nuclei/releases/download";

function getPackage() {
    switch (external_os_default().type()) {
        case 'Windows_NT':
            return `windows_amd64`;
        case 'Darwin':
            return `macOS_amd64`;
        case 'Linux':
        default:
            return `linux_amd64`;
    }
}

async function getLatestInfo() {
	return new Promise((resolve, reject) => {
		let data = [];
		external_https_default().get({
			hostname: 'api.github.com',
			path: '/repos/projectdiscovery/nuclei/releases/latest',
			headers: { 'User-Agent': 'Github Actions' }
		}, res => {
			res.on('data', chunk => data.push(chunk));
			res.on('close', () => resolve(JSON.parse(data.join(''))));
		}).on('error', err => {
			reject(err);
		});
	});
};

async function downloadAndInstall(selectedVersion) {
	const toolName = "nuclei";
	const latest = await getLatestInfo();
	
	const version = selectedVersion ? selectedVersion : latest.tag_name.replace(/v/g, '');

	let cachedPath = tool_cache.find(toolName, version);
	let binPath = `${cachedPath}/${toolName}`;
	if (external_fs_default().existsSync(binPath)) {
		return binPath
	}

	core.startGroup(`Download and install Nuclei ${version}`);

	const packageName = getPackage();
	const url = `${ROOT_URL}/v${version}/nuclei_${version}_${packageName}.zip`;

	core.info(`Download version ${version} from ${url}.`);

	const downloadDir = await tool_cache.downloadTool(url);
	if (downloadDir == null) {
		throw new Error(`Unable to download Nuclei from ${url}.`);
	}

	const installDir = await tool_cache.extractZip(downloadDir, process.env.GITHUB_WORKSPACE);
	if (installDir == null) {
		throw new Error("Unable to extract Nuclei.");
	}

  cachedPath = await tool_cache.cacheFile(`${installDir}/${toolName}`, toolName, toolName, version);
  binPath = `${cachedPath}/${toolName}`;
	
	external_fs_default().chmodSync(binPath, "777");

	core.info(`Nuclei ${version} was successfully installed to ${installDir}.`);
	core.endGroup();
	return binPath
}

// EXTERNAL MODULE: ../../../../../.asdf/installs/nodejs/22.2.0/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?js-yaml
var _notfoundjs_yaml = __nccwpck_require__(668);
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
;// CONCATENATED MODULE: ./src/yaml.js




const GITHUB_ACTOR = process.env.GITHUB_ACTOR;
const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY.replace(`${GITHUB_REPOSITORY_OWNER}/`, '');
const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

async function generateGithubReportFile(token) {
        const content = {
            "github" : {
                "username": GITHUB_ACTOR,
                "owner": GITHUB_REPOSITORY_OWNER,
                token,
                "project-name": GITHUB_REPOSITORY,
                "issue-label": "Nuclei Report",
                "severity-as-label": true 
            }
        }
        const githubConfigYml = _notfoundjs_yaml.dump(content, {
            flowLevel: 3
        });

        external_fs_namespaceObject.writeFileSync(external_path_namespaceObject.join(GITHUB_WORKSPACE, 'github-report.yaml'), githubConfigYml, err => {
        if (err)
            reject(err);
    });
}

;// CONCATENATED MODULE: ./src/utils.js
function parseFlagsToArray(rawFlags) {
    const re = /(?:(?:^|\s)-[-a-z]+)(?:(?:\s|=)(?:[^-](?:[0-9a-z-\S])*))?/g;
    return rawFlags.match(re).map(token => token.trim()).map(token => token.replace(' ', '='));
}
;// CONCATENATED MODULE: ./src/index.js






const target = core.getInput('target', { required: false });
const urls = core.getInput('urls', { required: false });
const templates = core.getInput('templates', { required: false });
const workflows = core.getInput('workflows', { required: false });
const sarifExport = core.getInput('sarif-export', { required: false });
const markdownExport = core.getInput('markdown-export', { required: false });
const reportConfig = core.getInput('report-config', { required: false });
const config = core.getInput('config', { required: false });
const userAgent = core.getInput('user-agent', { required: false });
const flags = core.getInput('flags', { required: false });
const output = core.getInput('output', { required: false });

const json = core.getBooleanInput('json', { required: false });
const includeRR = core.getBooleanInput('include-rr', { required: false });
const omitRaw = core.getBooleanInput('omit-raw', { required: false });

const githubReport = core.getBooleanInput('github-report', { required: false });
const githubToken = core.getInput('github-token', { required: false });

const nucleiVersion = core.getInput('nuclei-version', { required: false });

let execOutput = '';
let execError = '';

const options = {};
options.listeners = {
  stdout: (data) => {
    execOutput += data.toString();
  },
  stderr: (data) => {
    execError += data.toString();
  }
};

async function run() {
	try {
		// download and install
		const binPath = await downloadAndInstall(nucleiVersion);
    const params = [];

    if (!target && !urls) {
      core.setFailed('You need to set a target or provide a list of urls for Nuclei.');
      return
    }

    // Setting up params
    if (target) params.push(`-target=${target}`);
    if (urls) params.push(`-list=${urls}`);
    if (templates) {
      try {
        new URL(templates)
        params.push(`-turl=${templates}`);
      }
      catch(_) {
        params.push(`-t=${templates}`);
      }
    }
    if (workflows) params.push(`-w=${workflows}`);
    params.push(`-se=${sarifExport ? sarifExport : 'nuclei.sarif'}`);
    if (markdownExport) params.push(`-me=${markdownExport}`);
    if (reportConfig) params.push(`-rc=${reportConfig}`);
    if (config) params.push(`-config=${config}`);
    if (userAgent) params.push(`-H=${userAgent}`);
    params.push(`-o=${ output ? output : 'nuclei.log' }`);
    if (json) params.push('-json');
    if (includeRR) params.push('-irr');
    if (omitRaw) params.push('-or');

    if (flags) params.push(...parseFlagsToArray(flags));

    // If everything is fine and github-report is set, generate the yaml config file.
    if (githubReport) {
      await generateGithubReportFile(githubToken);
      params.push(`-rc=github-report.yaml`);
    }

		// run tool
    delete process.env.GITHUB_TOKEN
    exec.exec(binPath, params, options);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
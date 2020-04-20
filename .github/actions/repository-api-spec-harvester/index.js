"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var request = require("request-promise-native");
var wait_1 = require("./wait");
//https://github.com/marketplace/actions/publish-api-doc-on-apitree
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var ms, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.debug("Attempting to use Typescript in a promise...");
                    ms = core.getInput('milliseconds');
                    if (ms == "") {
                        ms = "100";
                    }
                    console.debug("Waiting ${ms} milliseconds.  Looks like core.debug does not work!!!");
                    console.debug("Printing some inputs:");
                    console.debug("who-to-greet:" + core.getInput("who-to-greet"));
                    console.debug("some-key" + core.getInput("stoplight-api-key"));
                    console.debug("Starting to parse ms at " + new Date().toTimeString());
                    return [4 /*yield*/, wait_1.wait(30000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, hasFileBeenPublished("sailpoint-v3-api")];
                case 2:
                    _a.sent();
                    console.debug("Completed parsing ms at:" + new Date().toTimeString());
                    core.setOutput('time', new Date().toTimeString());
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    core.setFailed(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
function hasFileBeenPublished(file) {
    return __awaiter(this, void 0, void 0, function () {
        var projectId, fileExists, fileInProjectUrl, getOptions, response, files, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file) {
                        throw new Error("Please provide a file for publication.");
                    }
                    projectId = core.getInput('stoplight-project-id');
                    if (!projectId) {
                        throw new Error("Please provide the project id associated with this publication.");
                    }
                    fileExists = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.debug("Attempting to list files in Stoplight project " + projectId);
                    fileInProjectUrl = "https://next-api.stoplight.io/projects/" + projectId + "/files";
                    getOptions = {
                        qs: { order_by: 'name', sort: 'asc' },
                        headers: {
                            'content-type': 'application/json',
                            authorization: 'Bearer ' + core.getInput('stoplight-api-key')
                        },
                        json: true
                    };
                    return [4 /*yield*/, request.get(fileInProjectUrl, getOptions)];
                case 2:
                    response = _a.sent();
                    files = response.data;
                    files.forEach(function (fileDescriptor) {
                        console.debug(fileDescriptor.id + ":" + fileDescriptor.name);
                        if (fileDescriptor.name === file) {
                            console.debug("File " + fileDescriptor.name + " already exist on server.");
                            fileExists = true;
                            return;
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw error_2;
                case 4: return [2 /*return*/, fileExists];
            }
        });
    });
}
run();
exports.default = run;

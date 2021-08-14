"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const axios_1 = __importDefault(require("axios"));
let axios = null;
function getInstanceSign() {
    if (!axios)
        initInstanceSign();
    return axios;
}
function setTokenSign(token) {
    joi_1.default.assert(token, joi_1.default.string().required());
    axios = getInstanceSign();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
function initInstanceSign() {
    axios = axios_1.default.create({
        baseURL: "https://api.in1.echosign.com"
    });
    axios.interceptors.response.use(response => response, error => {
        if (error.response && error.response.data && error.response.data.message)
            return Promise.reject(new Error(error.response.data.message));
        return Promise.reject(error);
    });
}
exports.default = {
    getInstanceSign,
    setTokenSign
};
//# sourceMappingURL=AxiosInstanceSign.js.map
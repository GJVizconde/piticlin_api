"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const errorHandle = (res, error, errorRaw) => {
    console.log(errorRaw);
    res.status(500).send(error);
};
exports.errorHandle = errorHandle;

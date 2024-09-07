"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFunctionName = void 0;
const myFunctionName = (request, response) => {
    response.status(200).send('Hello World!');
};
exports.myFunctionName = myFunctionName;

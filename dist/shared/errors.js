"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = exports.UserAlreadyExists = void 0;
class UserAlreadyExists extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
class UserNotFound extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.UserNotFound = UserNotFound;
//# sourceMappingURL=errors.js.map
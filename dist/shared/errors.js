"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoExpiration = exports.ExpiredLink = exports.LinkNotFound = exports.EmailRequired = exports.UserNotFound = exports.UserAlreadyExists = void 0;
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
class EmailRequired extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.EmailRequired = EmailRequired;
class LinkNotFound extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.LinkNotFound = LinkNotFound;
class ExpiredLink extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ExpiredLink = ExpiredLink;
class NoExpiration extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.NoExpiration = NoExpiration;
//# sourceMappingURL=errors.js.map
export declare class UserAlreadyExists extends Error {
    constructor(msg: string);
}
export declare class UserNotFound extends Error {
    constructor(msg: string);
}
export declare class EmailRequired extends Error {
    constructor(msg: string);
}
export declare class LinkNotFound extends Error {
    constructor(msg: string);
}
export declare class ExpiredLink extends Error {
    constructor(msg: string);
}
export declare class NoExpiration extends Error {
    constructor(msg: string);
}

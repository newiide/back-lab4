export declare class LinkDto {
    originalLink: string;
}
declare global {
    namespace Express {
        interface User {
            email: string;
        }
    }
}

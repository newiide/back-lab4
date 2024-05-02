/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LinkService } from '../service/links.service';
import { LinkDto } from '../models';
import { UserLeanDoc } from '../schema/users.schema';
import { Response } from 'express';
declare class LinkExpiredAtQuery {
    lt: Date;
    gt: Date;
}
declare class LinkQuery {
    expiredAt: LinkExpiredAtQuery;
}
export declare class OrdersController {
    private readonly linkService;
    constructor(linkService: LinkService);
    createLink(body: LinkDto, req: Request & {
        user: UserLeanDoc;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schema").LinksDoc> & import("../schema").Links & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getExpired(query: LinkQuery, req: Request & {
        user: UserLeanDoc;
    }): Promise<any[]>;
    getLink(res: Response, cut: string, req: Request & {
        user: UserLeanDoc;
    }): Promise<void>;
}
export {};

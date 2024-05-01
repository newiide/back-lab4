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
/// <reference types="mongoose/types/inferschematype" />
import { Types, Document } from 'mongoose';
interface Location {
    longitude: number;
    latitude: number;
}
export declare class Addresses {
    name: string;
    location: Location;
}
export declare const AddressesSchema: import("mongoose").Schema<Addresses, import("mongoose").Model<Addresses, any, any, any, Document<unknown, any, Addresses> & Addresses & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Addresses, Document<unknown, {}, import("mongoose").FlatRecord<Addresses>> & import("mongoose").FlatRecord<Addresses> & {
    _id: Types.ObjectId;
}>;
export type AddressesLeanDoc = Addresses & {
    _id: Types.ObjectId;
};
export type AddressesDoc = Addresses & Document;
export {};

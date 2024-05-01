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
import { Model } from 'mongoose';
import { OrderDto } from '../models';
import { OrdersDoc } from '../schema';
import { AddressesService } from './addresses.service';
export declare class OrderService {
    private readonly orderModel;
    private readonly addressesService;
    constructor(orderModel: Model<OrdersDoc>, addressesService: AddressesService);
    createOrder(body: OrderDto & {
        login: string;
    }): Promise<OrdersDoc>;
    calculateDistance(fromLoc: any, toLoc: any): number;
    determinePrice(type: string, distance: number): number;
    getOrders(userLogin: string, userRole: string): Promise<OrdersDoc[]>;
    updateOrderStatus(orderId: string, newStatus: string, userRole: string): Promise<{
        message: string;
    }>;
    getRecentFromAddresses(userLogin: string): Promise<string[]>;
    getRecentToAddresses(userLogin: string): Promise<string[]>;
    getRecentAddresses(login: string, addressType: 'from' | 'to', limit: number): Promise<string[]>;
    getLowestPrice(login: string): Promise<OrderDto | null>;
    getBiggestPrice(login: string): Promise<OrderDto | null>;
}

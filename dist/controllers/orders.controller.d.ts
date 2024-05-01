import { OrderService } from '../service';
import { OrderDto } from '../models';
import { UserLeanDoc } from '../schema';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(body: OrderDto, req: Request & {
        user: UserLeanDoc;
    }): Promise<import("../schema").OrdersDoc>;
    getOrders(req: Request & {
        user: {
            login: string;
            role: string;
        };
    }): Promise<import("../schema").OrdersDoc[]>;
    updateOrderStatus(body: {
        status: string;
    }, req: Request & {
        params: {
            orderId: string;
        };
        user: {
            role: string;
        };
    }): Promise<{
        message: string;
    }>;
    getLast5Fromddresses(req: Request & {
        user: UserLeanDoc;
    }): Promise<string[]>;
    getLast3ToAddresses(req: Request & {
        user: UserLeanDoc;
    }): Promise<string[]>;
    getLowestPriceOrder(req: Request & {
        user: UserLeanDoc;
    }): Promise<OrderDto>;
    getBiggestPriceOrder(req: Request & {
        user: UserLeanDoc;
    }): Promise<OrderDto>;
}

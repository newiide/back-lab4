"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
const models_1 = require("../models");
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(body, req) {
        try {
            const { user } = req;
            const order = await this.orderService.createOrder({
                ...body,
                login: user.login,
            });
            return order;
        }
        catch (err) {
            throw err;
        }
    }
    async getOrders(req) {
        const { login, role } = req.user;
        return this.orderService.getOrders(login, role);
    }
    async updateOrderStatus(body, req) {
        try {
            const { params, user } = req;
            const result = await this.orderService.updateOrderStatus(params.orderId, body.status, user.role);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getLast5Fromddresses(req) {
        try {
            const { user } = req;
            const last5Addresses = await this.orderService.getRecentFromAddresses(user.login);
            return last5Addresses;
        }
        catch (err) {
            throw err;
        }
    }
    async getLast3ToAddresses(req) {
        try {
            const { user } = req;
            const last3Addresses = await this.orderService.getRecentToAddresses(user.login);
            return last3Addresses;
        }
        catch (err) {
            throw err;
        }
    }
    async getLowestPriceOrder(req) {
        try {
            const { user } = req;
            const lowestPriceOrder = await this.orderService.getLowestPrice(user.login);
            return lowestPriceOrder;
        }
        catch (err) {
            throw err;
        }
    }
    async getBiggestPriceOrder(req) {
        try {
            const { user } = req;
            const biggestPriceOrder = await this.orderService.getBiggestPrice(user.login);
            return biggestPriceOrder;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.OrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Patch)('/:orderId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Get)('/addresses/from/last-5'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getLast5Fromddresses", null);
__decorate([
    (0, common_1.Get)('/addresses/to/last-3'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getLast3ToAddresses", null);
__decorate([
    (0, common_1.Get)('/lowest'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getLowestPriceOrder", null);
__decorate([
    (0, common_1.Get)('/biggest'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getBiggestPriceOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)({ path: '/orders' }),
    __metadata("design:paramtypes", [service_1.OrderService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map
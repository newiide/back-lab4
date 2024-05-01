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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const addresses_service_1 = require("./addresses.service");
let OrderService = class OrderService {
    constructor(orderModel, addressesService) {
        this.orderModel = orderModel;
        this.addressesService = addressesService;
    }
    async createOrder(body) {
        const fromAddress = await this.addressesService.createAddress(body.from);
        const toAddress = await this.addressesService.createAddress(body.to);
        const distance = this.calculateDistance(fromAddress.location, toAddress.location);
        const price = this.determinePrice(body.type, distance);
        const orderData = new this.orderModel({
            ...body,
            from: fromAddress._id,
            to: toAddress._id,
            status: 'Active',
            distance,
            price,
        });
        await orderData.save();
        return orderData.toObject();
    }
    calculateDistance(fromLoc, toLoc) {
        const rad = Math.PI / 180;
        const dLat = rad * (toLoc.latitude - fromLoc.latitude);
        const dLon = rad * (toLoc.longitude - fromLoc.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad * fromLoc.latitude) * Math.cos(rad * toLoc.latitude) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371 * c;
    }
    determinePrice(type, distance) {
        const rate = { standard: 2.5, lite: 1.5, universal: 3 }[type];
        if (!rate)
            throw new common_1.BadRequestException('Invalid order type');
        return rate * distance;
    }
    async getOrders(userLogin, userRole) {
        let query = this.orderModel.find();
        if (userRole === 'Driver') {
            query = query.where('status', 'Active');
        }
        else if (userRole !== 'Admin') {
            query = query.where('login', userLogin);
        }
        return query.exec();
    }
    async updateOrderStatus(orderId, newStatus, userRole) {
        const order = await this.orderModel.findById(orderId);
        if (!order)
            throw new common_1.BadRequestException('Order not found');
        if (order.status === 'Done')
            throw new common_1.BadRequestException('Cannot change status from Done');
        const validStatusChanges = {
            Customer: ['Rejected'],
            Driver: ['In progress', 'Done'],
            Admin: ['Rejected', 'In progress', 'Done'],
        };
        if (order.status === 'Active' && validStatusChanges[userRole].includes(newStatus)) {
            order.status = newStatus;
            await order.save();
            return { message: 'Order status updated successfully' };
        }
        throw new common_1.BadRequestException('Invalid status update attempt');
    }
    async getRecentFromAddresses(userLogin) {
        return this.getRecentAddresses(userLogin, 'from', 5);
    }
    async getRecentToAddresses(userLogin) {
        return this.getRecentAddresses(userLogin, 'to', 3);
    }
    async getRecentAddresses(login, addressType, limit) {
        const orders = await this.orderModel.find({ login }, { [addressType]: 1, _id: 0 }).sort({ _id: -1 }).limit(limit);
        return Array.from(new Set(orders.map(order => order[addressType])));
    }
    async getLowestPrice(login) {
        const orders = await this.orderModel.find({ login });
        if (orders.length === 0)
            return null;
        return orders.reduce((lowest, order) => order.price < lowest.price ? order : lowest).toObject();
    }
    async getBiggestPrice(login) {
        const orders = await this.orderModel.find({ login });
        if (orders.length === 0)
            return null;
        return orders.reduce((highest, order) => order.price > highest.price ? order : highest).toObject();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Orders.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        addresses_service_1.AddressesService])
], OrderService);
//# sourceMappingURL=order.service.js.map
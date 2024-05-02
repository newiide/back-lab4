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
const links_service_1 = require("../service/links.service");
const models_1 = require("../models");
const class_transformer_1 = require("class-transformer");
class LinkExpiredAtQuery {
}
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LinkExpiredAtQuery.prototype, "lt", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LinkExpiredAtQuery.prototype, "gt", void 0);
class LinkQuery {
}
__decorate([
    (0, class_transformer_1.Type)(() => LinkExpiredAtQuery),
    (0, class_transformer_1.Transform)(({ value }) => JSON.parse(value || '{}')),
    __metadata("design:type", LinkExpiredAtQuery)
], LinkQuery.prototype, "expiredAt", void 0);
let OrdersController = class OrdersController {
    constructor(linkService) {
        this.linkService = linkService;
    }
    async createLink(body, req) {
        try {
            const { user } = req;
            const order = await this.linkService.createLink({
                ...body,
                email: user.email,
            });
            return order;
        }
        catch (err) {
            throw err;
        }
    }
    async getExpired(query, req) {
        try {
            const { user } = req;
            const expirationDate = await this.linkService.getExpired(query, user);
            return expirationDate;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async getLink(res, cut, req) {
        try {
            const {} = req;
            const originalLink = await this.linkService.getLink(cut);
            return res.redirect(originalLink);
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.LinkDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createLink", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LinkQuery, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getExpired", null);
__decorate([
    (0, common_1.Get)('/:cut'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('cut')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getLink", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)({ path: '/links' }),
    __metadata("design:paramtypes", [links_service_1.LinkService])
], OrdersController);
//# sourceMappingURL=links.controller.js.map
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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const links_schema_1 = require("../schema/links.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
const shared_1 = require("../shared");
function setExpirationDate(days) {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + days);
    return expiredAt;
}
let LinkService = class LinkService {
    constructor(linkModel) {
        this.linkModel = linkModel;
    }
    async createLink(body) {
        const shortLink = (0, crypto_1.randomUUID)().replace(/-/g, '').slice(0, -17);
        const days = 5;
        const expiredAt = setExpirationDate(days);
        const doc = new this.linkModel({
            ...body,
            originalLink: body.originalLink,
            shortLink: shortLink,
            expiredAt: expiredAt,
        });
        const links = await doc.save();
        return links;
    }
    async getExpired(query, user) {
        const data = JSON.parse(query.expiredAt);
        if (!data.gt && !data.lt) {
            throw new shared_1.NoExpiration('There is any expiration date mentions, please try again!');
        }
        if (data.gt && data.lt) {
            const ltAndGtExpirationDate = await this.linkModel.aggregate([
                {
                    $match: {
                        email: user.email,
                        expiredAt: { $gt: new Date(data.gt), $lt: new Date(data.lt) }
                    },
                },
            ]);
            return ltAndGtExpirationDate;
        }
        if (data.gt) {
            const gtExpirationDate = await this.linkModel.aggregate([
                {
                    $match: {
                        email: user.email,
                        expiredAt: { $gt: new Date(data.gt) },
                    },
                },
            ]);
            return gtExpirationDate;
        }
        if (data.lt) {
            const ltExpirationDate = await this.linkModel.aggregate([
                {
                    $match: {
                        email: user.email,
                        expiredAt: { $lt: new Date(data.lt) },
                    },
                },
            ]);
            return ltExpirationDate;
        }
    }
    async getLink(cut, user) {
        const originalLink = await this.linkModel.findOne({ shortLink: cut });
        const now = setExpirationDate(0);
        if (originalLink.expiredAt < now) {
            throw new shared_1.ExpiredLink('Link was expired');
        }
        if (!originalLink) {
            throw new shared_1.LinkNotFound('Short link was not found');
        }
        return originalLink.originalLink;
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(links_schema_1.Links.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LinkService);
//# sourceMappingURL=links.service.js.map
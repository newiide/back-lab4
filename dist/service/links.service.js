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
function setExpirationTime(days = 0) {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + days));
}
let LinkService = class LinkService {
    constructor(linkModel) {
        this.linkModel = linkModel;
    }
    async createLink(body) {
        const shorterLink = (0, crypto_1.randomUUID)().slice(0, 8);
        const expiredAt = setExpirationTime(5);
        const linkDoc = new this.linkModel({
            ...body, originalLink: body.originalLink, shortLink: shorterLink, expiredAt
        });
        return linkDoc.save();
    }
    async getExpired(query, user) {
        const data = JSON.parse(query.expiredAt);
        if (!data.gt && !data.lt) {
            throw new Error('No expiration date provided.');
        }
        const filters = { email: user.email };
        if (data.gt)
            filters['expiredAt.$gt'] = new Date(data.gt);
        if (data.lt)
            filters['expiredAt.$lt'] = new Date(data.lt);
        return this.linkModel.aggregate([
            { $match: filters },
        ]);
    }
    async getLink(shortLink) {
        const linkDoc = await this.linkModel.findOne({ shortLink });
        if (!linkDoc) {
            throw new Error('Short link was not found');
        }
        const today = setExpirationTime();
        if (linkDoc.expiredAt < today) {
            throw new Error('Link has expired');
        }
        return linkDoc.originalLink;
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(links_schema_1.Links.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LinkService);
//# sourceMappingURL=links.service.js.map
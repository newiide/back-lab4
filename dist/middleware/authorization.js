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
exports.UserAuthorizationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../schema");
const mongoose_2 = require("mongoose");
let UserAuthorizationMiddleware = class UserAuthorizationMiddleware {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async use(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new common_1.UnauthorizedException(`User don't provide authorization token`);
        }
        const user = await this.userModel.findOne({ token: authorization });
        if (!user) {
            throw new common_1.BadRequestException(`User with this token was not found`);
        }
        req.user = user.toObject();
        next();
    }
};
exports.UserAuthorizationMiddleware = UserAuthorizationMiddleware;
exports.UserAuthorizationMiddleware = UserAuthorizationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserAuthorizationMiddleware);
//# sourceMappingURL=authorization.js.map
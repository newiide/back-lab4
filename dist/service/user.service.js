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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
function setExpirationTime(days = 0) {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + days));
}
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(body) {
        const existingUser = await this.userModel.findOne({ email: body.email });
        if (existingUser) {
            throw new Error(`User with email ${body.email} already exists`);
        }
        body.token = (0, crypto_1.randomUUID)();
        body.creationTime = setExpirationTime();
        const newUser = new this.userModel(body);
        await newUser.save();
        return newUser.toObject();
    }
    async login(body) {
        const user = await this.userModel.findOne({
            email: body.email,
            password: body.password,
        });
        if (!user) {
            throw new Error(`No user found with email ${body.email}`);
        }
        user.token = (0, crypto_1.randomUUID)();
        await user.save();
        return user.toObject();
    }
    async getAllUsers() {
        const users = await this.userModel.find({});
        return users.map(user => user.toObject());
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.DriverController = exports.AdminController = exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
const models_1 = require("../models");
const shared_1 = require("../shared");
const userAuthorization_middleware_1 = require("../midellware/userAuthorization.middleware");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(body) {
        try {
            const result = await this.userService.createUser(body);
            return result;
        }
        catch (err) {
            if (err instanceof shared_1.UserAlreadyExists) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async login(body) {
        try {
            const result = await this.userService.login(body);
            return { token: result };
        }
        catch (err) {
            if (err instanceof shared_1.UserNotFound) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)({ path: '/users' }),
    __metadata("design:paramtypes", [service_1.UserService])
], UsersController);
let AdminController = class AdminController {
    constructor(userService) {
        this.userService = userService;
    }
    async createAdmin(body, req) {
        const { authorization } = req.headers;
        if (authorization !== 'Password') {
            throw new common_1.UnauthorizedException('Unauthorized access');
        }
        try {
            body.role = 'Admin';
            const result = await this.userService.CreateAdmin(body);
            return result;
        }
        catch (err) {
            if (err instanceof shared_1.UserAlreadyExists) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.AdminDto,
        Request]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)({ path: '/admin' }),
    (0, common_1.UseGuards)(userAuthorization_middleware_1.UserAuthorizationMiddleware),
    __metadata("design:paramtypes", [service_1.UserService])
], AdminController);
let DriverController = class DriverController {
    constructor(userService) {
        this.userService = userService;
    }
    async createDriver(body) {
        try {
            body.role = 'Driver';
            const result = await this.userService.CreateDriver(body);
            return result;
        }
        catch (err) {
            if (err instanceof shared_1.UserAlreadyExists) {
                throw new common_1.BadRequestException(err.message);
            }
            throw err;
        }
    }
};
exports.DriverController = DriverController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.DriverDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "createDriver", null);
exports.DriverController = DriverController = __decorate([
    (0, common_1.Controller)({ path: '/drivers' }),
    __metadata("design:paramtypes", [service_1.UserService])
], DriverController);
//# sourceMappingURL=users.controller.js.map
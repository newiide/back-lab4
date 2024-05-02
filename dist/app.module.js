"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./controllers/users.controller");
const user_service_1 = require("./service/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const links_schema_1 = require("./schema/links.schema");
const schema_1 = require("./schema");
const authorization_1 = require("./middleware/authorization");
const links_controller_1 = require("./controllers/links.controller");
const links_service_1 = require("./service/links.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(authorization_1.UserAuthorizationMiddleware).exclude('/links/:cut').forRoutes('/links');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://newide:4errty09nmcfg@chebyreki.toyzjn7.mongodb.net/', { dbName: 'chebyreki' }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: schema_1.Users.name,
                    schema: schema_1.UserSchema,
                },
                {
                    name: links_schema_1.Links.name,
                    schema: links_schema_1.LinksSchema,
                },
            ]),
        ],
        controllers: [users_controller_1.UsersController, links_controller_1.OrdersController],
        providers: [user_service_1.UserService, links_service_1.LinkService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
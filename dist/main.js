"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const serverless_express_1 = require("@vendia/serverless-express");
const expressApp = express();
async function createNestServer(expressInstance) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Library Management API')
        .setDescription('API for managing books with CRUD and fuzzy search functionality')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.init();
}
createNestServer(expressApp)
    .then(() => console.log('NestJS serverless app ready'))
    .catch(err => console.error('NestJS startup error', err));
exports.handler = (0, serverless_express_1.configure)({ app: expressApp });
//# sourceMappingURL=main.js.map
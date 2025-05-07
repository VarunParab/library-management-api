"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const serverless_express_1 = require("@vendia/serverless-express");
let cachedServer;
async function bootstrap() {
    const expressApp = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Library Management API')
        .setDescription('API for managing books with CRUD and fuzzy search functionality')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.init();
    return (0, serverless_express_1.default)({ app: expressApp });
}
const handler = async (event, context, callback) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map
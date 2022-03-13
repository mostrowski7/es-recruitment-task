import { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes/index";
import { customErrorHandler } from "../middlewares/errorHandler";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import bodyParser from "body-parser";

export default (app: Application): void => {
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.use(cors());

  app.use(helmet());

  const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "Recruitment task - Order",
        version: "1.0.0",
      },
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Enter: Bearer token",
          bearerFormat: "JWT",
          scheme: "bearer",
        },
      },
      security: {
        bearerAuth: [],
      },
    },
    apis: [path.join(__dirname, "../../docs/*.yaml")],
  });

  app.use("/order/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(routes);

  app.use((req, res) => {
    res.sendStatus(404);
  });

  app.use(customErrorHandler);
};

import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import AppError from "@errors/AppError";
import createConnection from "../typeorm";

import swaggerFile from "../../../swagger.json";
import {router} from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
            type: err.type
        });
    }
    
    return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
    });
});

app.listen(3333, () => console.log("##### It's Alive! It's Alive! #####"));
